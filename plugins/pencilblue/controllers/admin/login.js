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

module.exports = function LoginViewControllerModule(pb) {
    
    //pb dependencies
    var util = pb.util;

    /**
     * Interface for admin login
     * @class LoginViewController
     * @constructor
     * @extends BaseController
     */
    function LoginViewController(){}
    util.inherits(LoginViewController, pb.BaseController);


    /**
     *
     * @method render
     */
    LoginViewController.prototype.render = function(cb) {
        var self = this;

        if(pb.security.isAuthorized(this.session, {authenticated: true, admin_level: pb.SecurityService.ACCESS_WRITER})) {
            var location = '/admin';
            var site = pb.SiteService.getSiteFromObject(this.session.authentication.user);
            if (!pb.SiteService.isNotSetOrEqual(site, self.site)) {
                location += pb.SiteService.getCurrentSitePrefix(site);
            }
            this.redirect(location, cb);
            return;
        }
        else if(pb.security.isAuthenticated(this.session)) {
            this.redirect('/', cb);
            return;
        }

        this.setPageName(' ' + this.ls.get('LOGIN'));
        this.templateService.load('admin/login',  function(err, data) {
            cb({content: data});
        });
    };

    //exports
    return LoginViewController;
};
