import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
    constructor(headerTriggerElement) {
        this.lazyImages = $('.lazyload');
        this.siteHeader = $('.site-header');
        this.headerTriggerElement = headerTriggerElement;
        this.createHeaderWayPoint();
        this.pageSections = $('.page-section');
        this.headerLinks = $('.primary-nav a');
        this.createPageSectionWayPoints();
        this.addSmoothScrolling();
        this.refreshWayPoints();

    }

    refreshWayPoints(){
        this.lazyImages.on('load',function(){
            Waypoint.refreshAll();
        })
    }

    createHeaderWayPoint() {
        var self = this;
        new Waypoint({
            element: this.headerTriggerElement[0],
            handler: function(direction) {
                if (direction == 'down') {
                    self.siteHeader.addClass('site-header--dark');
                } else {
                    self.siteHeader.removeClass('site-header--dark');
                }

            }
        })
    }

    addSmoothScrolling(){
    	this.headerLinks.smoothScroll();
    }

    createPageSectionWayPoints() {
        var self = this;
        this.pageSections.each(function() {
            var currentPageSection = this;
            new Waypoint({
                element: currentPageSection,
                handler: function(direction) {
                    if (direction === 'down') {
                        var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        self.headerLinks.removeClass('is-current-link');
                        $(matchingHeaderLink).addClass('is-current-link');
                    }
                },
                offset: "18%"
            });
            new Waypoint({
                element: currentPageSection,
                handler: function(direction) {
                    if (direction === 'up') {
                        var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        self.headerLinks.removeClass('is-current-link');
                        $(matchingHeaderLink).addClass('is-current-link');
                    }
                },
                offset: "-40%"
            })
        });
    }

}

export default StickyHeader;