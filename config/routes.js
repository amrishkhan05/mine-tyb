/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


    //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
    //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
    //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` your home page.            *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

    '/': {
        view: 'pages/homepage'
    },

    /***************************************************************************
     *                                                                          *
     * More custom routes here...                                               *
     * (See https://sailsjs.com/config/routes for examples.)                    *
     *                                                                          *
     * If a request to a URL doesn't match any of the routes in this file, it   *
     * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
     * not match any of those, it is matched against static assets.             *
     *                                                                          *
     ***************************************************************************/
    'POST /categories': 'CategoriesController.create',
    'POST /prototypes': 'PrototypesController.create',
    'POST /users/playlist': 'PlaylistController.playlist',
    'POST /users/createPlaylist': 'PlaylistController.createPlaylist',
    'GET /api/categories/:id': 'CategoriesController.findOne',
    'POST /api/guaca': 'PrototypesController.generateToken',
    'POST /api/similarprototypes/': 'PrototypesController.similarprototypes',
    'POST /users/authenticate': 'UserController.authenticate',
    'POST /users/register': 'UserController.register',
    'POST /users/forgotPassword': 'UserController.forgotPassword',    
    'POST /users/changePassword': 'UserController.changePassword',        
    'POST /users/getfavorite/': 'UserController.getFavorite',
    'POST /users/favorite': 'UserController.createFavorite',
    'POST /users/deletefavorite': 'UserController.deleteFavorite',
    'POST /users/getSuggested': 'UserController.getSuggested',
    'PUT /categories': 'CategoriesController.relateapi',
    'PUT /prototypes': 'PrototypesController.relateapi',
    'POST /search/prototypesFilter': 'PrototypesController.prototypesFilter',
    'POST /search/getFilterPrototypes': 'PrototypesController.getFilterPrototypes',
    'POST /api/searchdata': 'PrototypesController.searchdata',
    'POST /api/prototypesSearch': 'PrototypesController.prototypesSearch',
    'POST /users/getFirstLogin/': 'UserController.getFirstLogin',
    'POST /users/Firstlogin/': 'UserController.Firstlogin',
    //------Playlist Api endpoint starts------
    'POST /users/getplaylist': 'PlaylistController.getPlaylist',
    'POST /users/deletePlaylist/:id': 'PlaylistController.deletePlaylist',
    'PUT /users/updatePlaylist': 'PlaylistController.updatePlaylist',
    'PUT /users/deleteprototype/:id': 'PlaylistController.deleteProtoFromPlaylist',
    //------Playlist Api endpoint ends------

    //Add Prototype Controller begins
    'POST /api/loadAddedPrototypes': 'AddPrototypeController.loadAddedPrototypes',
    'POST /api/prototypes': 'AddPrototypeController.AddPrototype',
    'POST /api/categoryname': 'AddPrototypeController.categoryName',
    'DELETE /api/prototypes/:id': 'AddPrototypeController.delete',
    //Image upload in Add Prototype
    'POST /api/imageupload': 'AddPrototypeController.imageupload',
    //edit Prototype
    'POST /api/editPrototype': 'AddPrototypeController.editPrototype',
    //update Prototype
    'PUT /api/updatePrototype/:id': 'AddPrototypeController.updatePrototype',

    //Profile starts

    //dp upload in profile
    'POST /api/dpupload': 'UserController.uploadDP',
    'PUT /users/updateDp/': 'UserController.updateDpInfo',
    'POST /users/profile': 'UserController.profile',
    'POST /users/ViewProfile': 'UserController.ViewProfile',
    //chatbot starts
    'POST /firstTimeUser': 'ChatbotController.firstTimeUser',
    'POST /oldUser': 'ChatbotController.oldUser',

    //Service request starts
    'POST /servicerequest/getServiceRequests': 'ServiceController.getServiceRequests',
    'POST /servicerequest/addServiceRequest': 'ServiceController.addServiceRequest',
    // 'POST /servicerequest/getEnvironments': 'ServiceController.getEnvironment',
    'DELETE /servicerequest/delete/:id/:userId': 'ServiceController.deleteServiceRequest',
    'PUT /servicerequest/updateService/:id': 'ServiceController.updateService',
    'POST /servicerequest/ApproveRequest': 'ServiceController.ApproveRequest',
    'POST /servicerequest/RejectRequest': 'ServiceController.RejectRequest',
    'POST /servicerequest/revertrequest': 'ServiceController.revertRequest',
    'POST /servicerequest/ApprovedService': 'ServiceController.ApprovedService',
    'POST /servicerequest/getservicerequestinstances/:id': 'ServiceController.getServiceRequestInstances',
    'POST /servicerequest/getserviceenvironment/:id': 'ServiceController.getServiceEnvironment',
    'POST /servicerequest/ExtendRequest': 'ServiceController.ExtendRequest',
    'POST /users/InstanceassignDate': 'UserController.InstanceassignDate',
    'POST /service/upload/:id': 'ServiceController.uploadAssets',
    // 'POST /servicerequest/ExtendRequest': 'ServiceController.ExtendRequest' 
    //crowdsource 

    'POST /servicerequest/getInstanceLowFidelity': 'ServiceController.getInstanceLowFidelity',
    'POST /servicerequest/getInstanceHighFidelity': 'ServiceController.getInstanceHighFidelity',
    'POST /servicerequest/getnominees/': 'ServiceController.getNominees',
    'POST /servicerequest/savednext2days/': 'ServiceController.savednext2days',
    'POST /servicerequest/getInstanceLowFidelity': 'ServiceController.getInstanceLowFidelity',
    'PUT /servicerequest/saveCrowdResources/': 'ServiceController.saveCrowdResources',
    'POST /servicerequest/getsavedResources/': 'ServiceController.getsavedResources',
    'PUT /servicerequest/assigncrowd/:id': 'ServiceController.assignCrowd',
    'POST /servicerequest/validatetoyboxuser': 'ServiceController.validateToyboxUser',
    'POST /servicerequest/assigninstances': 'ServiceController.assignInstances',
    'POST /servicerequest/getallenrollment': 'ServiceController.getallenrollment',
    'POST /servicerequest/assigned_crowd': 'ServiceController.assigned_crowd',
    // 'POST /users/highfidelityCrowd/': 'ServiceController.highfidelityCrowd',

    //campaign
    'POST /users/getcampaign/': 'UserController.getCampaign',
    'POST /users/campaign/:id': 'UserController.campaign',
    'POST /users/sendmailvd/': 'UserController.sendMailVd',
    'POST /users/getCrowdSourcingData/': 'UserController.getCrowdSourcingData',
    'POST /users/revertcampaign/': 'UserController.revertCampaign',
    'POST /servicerequest/getenrollment': 'ServiceController.getenrollment',

    'POST /users/crowdsourcemail': 'UserController.crowdSourcEmail',
    'POST /servicerequest/getserviceinstancerequest': 'ServiceController.getserviceinstancerequest',
    'POST /servicerequest/getactiveenrollments': 'ServiceController.getactiveenrollments',
    'POST /servicerequest/getassignedusers': 'ServiceController.getassignedusers',
    'POST /servicerequest/viewRequest': 'ServiceController.viewRequest',
    'POST /servicerequest/viewcampaignDetails/': 'ServiceController.viewcampaigndetails',
    'PUT /servicerequest/nominateuser/:id': 'ServiceController.nominateuser',
    'POST /users/enrolluser/': 'UserController.enrolluser',
    //rbac-dashboard

    'POST /api/loadPendingPrototypes/': 'PrototypesController.loadPendingPrototypes',
    'POST /api/editPrototype': 'PrototypesController.editPrototype',
    'POST /servicerequest/PendingServiceRequest/': 'ServiceController.PendingServiceRequest',
    'POST /api/loadApprovedPrototypes/': 'PrototypesController.loadApprovedPrototypes',
    'PUT /api/approvePrototype/:id': 'PrototypesController.approvePrototype',
    'PUT /api/rejectPrototype/:id': 'PrototypesController.rejectPrototype',
    'PUT /api/changeApprovedViewStatus/:id': 'PrototypesController.changeApprovedViewStatus',
    //notification
    'POST /users/notifications': 'NotificationController.notification',
    'POST /users/getnotification/:id': 'NotificationController.getNotification',
    'GET /api/notificationview/:id': 'NotificationController.notificationView',
    'POST /users/notification': 'NotificationController.createNotification',
    'PUT /users/notification/:id': 'NotificationController.updateNotification',
    //landing page
    'GET /users/getSuggested/': 'UserController.getSuggested',
    'POST /users/getUsers': 'UserController.getUsers',
    'PUT /users/updateUserGroup': 'UserController.updateUserGroup',
    //prototype detail review and rating
    'POST /search/getReview': 'PrototypesController.getReview',
    'POST /users/shareUsers': 'UserController.shareUsers',
    'POST /users/getrate/': 'UserController.getrate',
    'POST /search/avgRatingStore/': 'PrototypesController.avgRatingStore',
    'POST /search/storeRating/': 'PrototypesController.storeRating',
    'POST /users/ratePopup': 'PrototypesController.ratePopup',

    'POST /users/savesharedUsers': 'SharedUsersController.savesharedUsers',
    'PUT /users/playlistDescription': 'PlaylistController.playlistDescription',
    'PUT /users/approvePlaylist/:id': 'PlaylistController.approvePlaylist',
    'PUT /users/rejectPlaylist/:id': 'PlaylistController.rejectPlaylist',
    'POST /users/getvipPlaylist': 'PlaylistController.getvipPlaylist',

    //activity feed
    'PUT /users/activityFeed': 'UserController.activityFeed',

    //userregister
    'GET /user/register': 'UserController.registerUser',

    'POST /users/getActivityFeed/:id': 'ActivityFeedController.getActivityFeed',
    //contact us
    'POST /users/sendcontact/': 'UserController.sendContact',
    //playlist
    'POST /api/prototypes/:id': 'PlaylistController.playlistPrototypes',
    'PUT /users/deleteprototype/:id': 'PlaylistController.deletePrototype',
    'POST /users/loadPendingPlaylists/': 'PlaylistController.loadPendingPlaylists',
    'POST /users/pushUsers': 'PlaylistController.pushUsers',
    'POST /users/shareUsersDL': 'SharedUsersController.shareUsersDL',
    'POST /users/dlnameshare': 'SharedUsersController.dlnameshare',
    'POST /users/follow': 'UserController.follow',
    'POST /users/coreteam': 'UserController.coreteam',
    'PUT /users/followerAndFollowingUpdate/:id': 'UserController.followerAndFollowingUpdate',
    'POST /users/getRewardsPoints': 'UserController.getRewardsPoints',
    'POST /users/profileRewardPoints': 'UserController.profileRewardPoints',
    //home
    'POST /proto/getDynamicData/': 'PrototypesController.getDynamicData',
    'POST /proto/updateViewCount/:id': 'PrototypesController.updateViewCount',
    'POST /proto/getUserDynamicData/': 'PrototypesController.getUserDynamicData',
    'POST /proto/previewCount/:id': 'PrototypesController.updatePreviewCount',
    //leads& opportunities
    'POST /opportunities/createopportunities': 'OpportunityController.createOpportunity',
    'POST /opportunity/upload/:id/:uploadType': 'OpportunityController.uploadAssets',
    'POST /opportunities/getopportunities': 'OpportunityController.getopportunities',
    'POST /opportunities/getopportunitiesform/:id': 'OpportunityController.getopportunitiesform',

    //user Verification
    'POST /users/verification': 'UserController.pendingVerification',
    'POST /users/Verifyuser': 'UserController.Verifyuser',
    'PUT /users/unfollow/:id': 'UserController.unfollow',    
};