var AWS = require('aws-sdk');
// const Template = require('../models/template');
// const Instance = require('../models/instances');
var qs = require('qs');
AWS.config.loadFromPath('./aws/config.json');
var request = require("request");
var btoa = require("btoa");
var ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });
var each = require('async-each-series');
var template;
var params;
var keyParams;
var securityParams;
var describeParams;
var KeyName;
var KeyMaterial;
var KeyFingerprint;
var GroupId;
var instanceId;
module.exports = {
  createInstance(image, platform, count) {
    return new Promise((resolve, reject) => {
      console.log("Image Type", image)
      keyParams = {
        KeyName: 'sample10' + count,
        DryRun: false
      };
      securityParams = {
        Description: 'sample10' + count,
        GroupName: 'sample10' + count,
        DryRun: false
      }
      ec2.createKeyPair(keyParams, function(err, data) {
        if (err) console.log("Key pair err", err, err.stack); // an error occurred
        else {
          console.log("key name params of EC2", data); // successful response
          KeyName = data.KeyName;
          console.log("keyname of EC2", KeyName)
          ec2.createSecurityGroup(securityParams, function(err, data) {
            if (err) console.log("SecurityGroup err", err, err.stack); // an error occurred
            else {
              var groupParams = {
                GroupId: data.GroupId,
                IpPermissions: [{
                  IpProtocol: "tcp",
                  FromPort: 3389,
                  ToPort: 3389,
                  IpRanges: [{
                    CidrIp: "0.0.0.0/0",
                    Description: "RDP access"
                  }]
                }]
              }
              ec2.authorizeSecurityGroupIngress(groupParams, function(err, data) {
                if (err) console.log(err, err.stack);
                else {
                  console.log("incure", data);
                  console.log("security grp err", data); // successful response
                  GroupId = data.GroupId;




                  Template.update({ 'type': image })
                    .set({
                      "KeyName": KeyName
                    }).push({
                      "SecurityGroupIds": GroupId,
                      "SecurityGroups": securityParams.GroupName
                    })
                    .then((results) => {
                      Template.find((err, results) => {
                        if (err) console.log(err);
                        else {
                          template = JSON.stringify(results);
                          template = JSON.parse(template);
                          for (let i = 0; i < template.length; i++) {
                            if (template[i].type === image) {
                              params = template[i];
                              params.MaxCount = count;
                              delete params._id;
                              delete params.type;
                              console.log("params returned", params);
                            }
                          }
                          ec2.runInstances(params, function(err, data) {
                            if (err) console.log("Main errr", err, err.stack); // an error occurred
                            else {
                              console.log(data.Instances, "data.instances"); // successful response
                              var instancesArray = data.Instances;
                              var instancesIds = [];
                              instancesArray.forEach(function(e) {
                                  instancesIds.push(e.InstanceId)
                                })
                                // instanceId = data.Instances[0].InstanceId;
                              console.log(instancesArray, "instancesArray")
                              describeParams = {
                                InstanceIds: instancesIds
                              }
                              console.log(describeParams, "describeParams");
                              let desc_ins = new Promise(function(resolve, reject) {
                                setTimeout(function() {
                                  ec2.describeInstances(describeParams,  function(err,  data) {
                                    if  (err)  console.log(err,  err.stack);  // an error occurred
                                    else  {
                                      var instCreated = [];
                                      console.log(data.Reservations, "data.Reservations");
                                      data.Reservations.forEach(element => {
                                        element.Instances.forEach((elem, index) => {
                                          let temp = {
                                            index: index,
                                            PublicDnsName: elem.PublicDnsName,
                                            PublicIpAddress: elem.PublicIpAddress,
                                            InstanceId: elem.InstanceId
                                          }
                                          instCreated.push(temp);
                                        });
                                      });
                                      console.log(instCreated, "instCreated")
                                      var credentials = {
                                        username: "guacadmin",
                                        password: "guacadmin"
                                      };
                                      request({
                                        url: "http://ec2-34-201-9-173.compute-1.amazonaws.com:8080/guacamole/api/tokens",
                                        method: "POST",
                                        headers: {
                                          "content-type": "application/x-www-form-urlencoded"
                                        },
                                        body: qs.stringify(credentials)
                                      }, function(err, response, body) {
                                        if (err) console.log(err);
                                        else {
                                          var data = JSON.parse(body);
                                          token = data.authToken;
                                          console.log("token ", token);
                                          var guaInfo = [];
                                          instCreated.forEach(function(e) {
                                            let info = {
                                              "name": e.PublicDnsName,
                                              "parentIdentifier": "ROOT",
                                              "protocol": "rdp",
                                              "attributes": {
                                                "guacd-encryption": null,
                                                "max-connections": "10",
                                                "guacd-hostname": null,
                                                "guacd-port": null,
                                                "max-connections-per-user": "10"
                                              },
                                              "parameters": {
                                                "hostname": e.PublicIpAddress,
                                                "password": "Asdfg!23",
                                                "port": "3389",
                                                "username": "toybox1",
                                                "enable-wallpaper": true,
                                                "enable-theming": true,
                                                "enable-full-window-drag": true
                                              }
                                            }
                                            guaInfo.push(info);
                                          });
                                          var dbguaData = [];
                                          each(guaInfo, function(e, next) {
                                            request({
                                              url: "http://ec2-34-201-9-173.compute-1.amazonaws.com:8080/guacamole/api/session/data/mysql/connections?token=" + token,
                                              method: "POST",
                                              headers: {
                                                "content-type": "application/json"
                                              },
                                              body: JSON.stringify(e)
                                            }, function(err, response, body) {
                                              if (err) console.log(err);
                                              else {
                                                var body = JSON.parse(body);
                                                var identifier = body.identifier;
                                                var crypt = btoa([identifier, 'c', 'mysql'].join('\0'));
                                                var url = "http://ec2-34-201-9-173.compute-1.amazonaws.com:8080/guacamole/#/client/" + crypt + "/?token=";
                                                let temp = {
                                                  url,
                                                  flag: false,
                                                  instance_type: platform,
                                                  operating_system: image
                                                }
                                                dbguaData.push(temp);
                                                console.log("push");
                                                next();
                                              }
                                            });
                                          }, function(err) {
                                            Instance.create(dbguaData, function(err, response) {
                                              if (err) console.log(err);
                                              else console.log(response);
                                            })
                                          });
                                        }
                                      });
                                    }
                                  });
                                }, 30000);
                              });
                              desc_ins.then(() => console.log("set timeout done ...")).catch();
                            }
                          });

                        }
                      });
                    })
                    .catch((err) => {
                      console.log(err)
                    })
                }







              });


            }
          });
        }
      });

    });
  }
};