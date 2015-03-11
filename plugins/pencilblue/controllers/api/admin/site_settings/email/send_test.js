/*
    Copyright (C) 2015  PencilBlue, LLC

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

module.exports = function(pb) {
    
    //pb dependencies
    var util = pb.util;
    
    /**
     * Resends an account verification email
     */
    function SendTestEmail(){}
    util.inherits(SendTestEmail, pb.FormController);

    SendTestEmail.prototype.onPostParamsRetrieved = function(post, cb) {
        var self = this;

        var message = this.hasRequiredParams(post, this.getRequiredFields());
        if(message) {
            cb({content: pb.BaseController.apiResponse(pb.BaseController.API_FAILURE, message)});
            return;
        }

        var options = {
            to: post.email,
            subject: 'Test email from PencilBlue',
            layout: 'This is a successful test email from the PencilBlue system.',
        };
        var emailService = new pb.EmailService();
        emailService.sendFromLayout(options, function(err, response) {
            if (util.isError(err)) {
                return cb({content: pb.BaseController.apiResponse(pb.BaseController.API_FAILURE, JSON.stringify(err))});
            }
            cb({content: pb.BaseController.apiResponse(pb.BaseController.API_SUCCESS, 'email successfully sent')});
        });
    };

    SendTestEmail.prototype.getRequiredFields = function() {
        return ['email'];
    };

    //exports
    return SendTestEmail;
};
