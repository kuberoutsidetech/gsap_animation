import 'popper.js';
import 'bootstrap/js/dist/modal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { TextPlugin } from 'gsap/TextPlugin';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';
import { CSSPlugin } from 'gsap/CSSPlugin';


gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin, CSSRulePlugin, CSSPlugin); // add 'GSDevTools' here to registerPlugin.

class global {
    constructor() {
        this.myModal = document.getElementById('exampleModal');
        this.stickyHeader();
        this.megamenuPopup();
        this.toggleContent();
        this.readMore();
        this.initIntro();
        this.bodyText1();
        this.services();
        this.clients();
    }

    stickyHeader() {
        var elemBody = $('body');
        var pageHeader = $('.theme-header');
        if ($(elemBody).hasClass('home')) {
            $(pageHeader).addClass('theme-header--dark');
        }

        $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('.theme-header').addClass('is-fixed is-visible');
            } else {
                $('.theme-header').removeClass('is-fixed is-visible');
            }
        });
    }

    megamenuPopup() {
        var toggleBar = $('.navbar-toggle');
        var popupMenu = $('.megamenu-popup');
        var closePopup = $('.close-menu');
        $(toggleBar).click(function () {
            $(popupMenu).addClass('active');
        });
        $(closePopup).click(function () {
            $(popupMenu).removeClass('active');
        });
    }

    toggleContent() {
        var toggleContent = $('.toggle-text');
        var viewBtn = $('.toggleRead');
        $(viewBtn).click(function () {
            $(this).toggleClass('active');
            $(toggleContent).toggleClass('active');
        });
    }

    readMore() {
        $('.readmore').click(function () {
            $('.collapse-text').addClass('expand');
            $(this).hide();
        });
    }

    initIntro() {
        const introContent = $('.js-text');
        // split paragraph text into words
        let introOutterContent = new SplitText('.js-text', { type: 'words' });
        let splitTextTimeline = gsap.timeline();
        window.addEventListener('resize', function () {
            if (window.innerWidth !== width) {
                introOutterContent.revert();
            }
        });
        introContent.addClass('split');
        $(introOutterContent.words).each(function (index, el) {
            splitTextTimeline.from(
                $(el),
                { duration: 0.6, opacity: 0, 'clip-path': 'polygon(0 -100%, 100% -100%, 100% 0,0 0)' },
                index * 0.05
            );
            splitTextTimeline.to(
                $(el),
                { duration: 0.6, opacity: 1, color: '#fff', 'clip-path': 'polygon(0 100%, 100% 100%, 100% 0, 0 0)' },
                index * 0.05
            );
        });
        splitTextTimeline.play();
    }

    bodyText1() {
        const introContent = $('.body-text-1');
        // split paragraph text into lines
        let introOutterContent = new SplitText('.body-text-1', { type: 'lines, lines' });
        let splitTextTimeline1 = gsap.timeline();
        window.addEventListener('resize', function () {
            if (window.innerWidth !== width) {
                introOutterContent.revert();
            }
        });
        $(introOutterContent.lines).each(function (index, el) {
            splitTextTimeline1.to(
                $(el),
                {
                    duration: 0.6,
                    color: '#fff',
                    scrollTrigger: {
                        trigger: '.body-text-1',
                        scrub: true,
                        start: 'top bottom',
                        // markers: true,
                        color: '#fff',
                        opacity: 1,
                    },
                },
                index * 0.05
            );
        });
        splitTextTimeline1.play();
    }

    services() {
        let FollowBox = '#cursor';

        gsap.set(FollowBox, {
            xPercent: -50,
            yPercent: -50,
            // scale: 0
        });


        const home_service = gsap.utils.toArray('.home-service')

        home_service.forEach((text, i) => {

            gsap.to(text,{
                scrollTrigger:{
                    trigger: text,
                    start: 'top center',
                    // markers: true,
                    toggleClass: 'is-current',
                },
            
                duration: 0.5
            })
            
        });

        const lines = gsap.utils.toArray('.home-service__line__inner')
        lines.forEach((line,i)=>{
            gsap.to(line,{
                scrollTrigger:{
                    trigger: line,
                    start: 'top center',
                    // markers: true,
                    duration: 1
                },
                scaleX: (0,1),
                transformOrigin: '0 50%'
                
            })

        })
        

        gsap.to('.home-services__sticky', {
            scrollTrigger: {
                trigger: '.home-services__content',
                start: 'top top',
                end: 'bottom top',
                // markers: true,
                scrub: true,
                pin: ".home-services__sticky",
            }
        })

       

        document.getElementById('home-services').addEventListener('mouseenter', (e) => {
            gsap.to(FollowBox, {
                visibility: 'visible'
            });
            document.getElementById('cursor').classList.add('is-view');
        });
        document.getElementById('home-services').addEventListener('mouseleave', (e) => {4
            gsap.to(FollowBox, {
                visibility: 'hidden'
            });
            document.getElementById('cursor').classList.remove('is-view');
        });

        document.getElementById('home-services').addEventListener('mousemove', (e) => {
            gsap.to(FollowBox, {
                x: e.clientX + 60,
                y: e.clientY + 60,
                visibility: 'visible',
                opacity: 1,
            });
        });
    }

    clients() {
        gsap.to('.app-bg', {
            scrollTrigger: {
                trigger: '.clients',
                start: '-50% top',
                end: '-40% top',
                // markers: true,
                scrub: 0,
            },
            background: '#000',
        })
        gsap.to('.clients__lists',{
            scrollTrigger: {
                trigger: '.clients',
                start: '-25% center',
            },
            width:'100%', 
        },'+=');
    }
}

export default global;
new global();
