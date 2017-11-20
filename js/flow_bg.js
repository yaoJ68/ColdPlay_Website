! function(window, document) {

    function extend(out) {
        out = out || {};
        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];
            if (obj)
                for (var key in obj) obj.hasOwnProperty(key) && ("object" == typeof obj[key] ? deepExtend(out[key], obj[key]) : out[key] = obj[key])
        }
        return out
    }

    function Plugin(element, options) {
        function styleCanvas() {
            canvas.width = element.offsetWidth, canvas.height = element.offsetHeight, ctx.fillStyle = options.dotColor, ctx.strokeStyle = options.lineColor, ctx.lineWidth = options.lineWidth
        }

        function draw() {
            if (canvasSupport) {
                winW = window.innerWidth, winH = window.innerHeight, ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (var i = 0; i < particles.length; i++) particles[i].updatePosition();
                for (var i = 0; i < particles.length; i++) particles[i].draw();
                paused || (raf = requestAnimationFrame(draw))
            }
        }

        function resizeHandler() {
            styleCanvas();
            for (var elWidth = element.offsetWidth, elHeight = element.offsetHeight, i = particles.length - 1; i >= 0; i--)(particles[i].position.x > elWidth || particles[i].position.y > elHeight) && particles.splice(i, 1);
            var numParticles = Math.round(canvas.width * canvas.height / options.density);
            if (numParticles > particles.length)
                for (; numParticles > particles.length;) {
                    var p = new Particle;
                    particles.push(p)
                } else numParticles < particles.length && particles.splice(numParticles);
            for (i = particles.length - 1; i >= 0; i--) particles[i].setStackPos(i)
        }

        function pause() {
            paused = !0
        }

        function start() {
            paused = !1, draw()
        }

        function Particle() {
            switch (this.stackPos, this.active = !0, this.layer = Math.ceil(3 * Math.random()), this.parallaxOffsetX = 0, this.parallaxOffsetY = 0, this.position = {
                x: Math.ceil(Math.random() * canvas.width),
                y: Math.ceil(Math.random() * canvas.height)
            }, this.speed = {}, options.directionX) {
                case "left":
                    this.speed.x = +(-options.maxSpeedX + Math.random() * options.maxSpeedX - options.minSpeedX).toFixed(2);
                    break;
                case "right":
                    this.speed.x = +(Math.random() * options.maxSpeedX + options.minSpeedX).toFixed(2);
                    break;
                default:
                    this.speed.x = +(-options.maxSpeedX / 2 + Math.random() * options.maxSpeedX).toFixed(2), this.speed.x += this.speed.x > 0 ? options.minSpeedX : -options.minSpeedX
            }
            switch (options.directionY) {
                case "up":
                    this.speed.y = +(-options.maxSpeedY + Math.random() * options.maxSpeedY - options.minSpeedY).toFixed(2);
                    break;
                case "down":
                    this.speed.y = +(Math.random() * options.maxSpeedY + options.minSpeedY).toFixed(2);
                    break;
                default:
                    this.speed.y = +(-options.maxSpeedY / 2 + Math.random() * options.maxSpeedY).toFixed(2), this.speed.x += this.speed.y > 0 ? options.minSpeedY : -options.minSpeedY
            }
        }

        function option(key, val) {
            if (!val) return options[key];
            options[key] = val
        }

        function destroy() {
            console.log("destroy"), canvas.parentNode.removeChild(canvas), hook("onDestroy"), $ && $(element).removeData("plugin_" + pluginName)
        }

        function hook(hookName) {
            void 0 !== options[hookName] && options[hookName].call(element)
        }
        var canvas, ctx, raf, winW, winH, pointerX, pointerY, canvasSupport = !!document.createElement("canvas").getContext,
            particles = [],
            mouseX = 0,
            mouseY = 0,
            desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i),
            orientationSupport = !!window.DeviceOrientationEvent,
            tiltX = 0,
            tiltY = 0,
            paused = !1;
        options = extend({}, window[pluginName].defaults, options);
        var proximityS2 = options.proximity * options.proximity;
        return Particle.prototype.draw = function() {
                ctx.beginPath(), ctx.arc(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY, options.particleRadius / 2, 0, 2 * Math.PI, !0), ctx.closePath(), ctx.fill(), ctx.beginPath();
                for (var i = particles.length - 1; i > this.stackPos; i--) {
                    var p2 = particles[i],
                        a = this.position.x - p2.position.x,
                        b = this.position.y - p2.position.y;
                    a * a + b * b < proximityS2 && (ctx.moveTo(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY), options.curvedLines ? ctx.quadraticCurveTo(Math.max(p2.position.x, p2.position.x), Math.min(p2.position.y, p2.position.y), p2.position.x + p2.parallaxOffsetX, p2.position.y + p2.parallaxOffsetY) : ctx.lineTo(p2.position.x + p2.parallaxOffsetX, p2.position.y + p2.parallaxOffsetY))
                }
                ctx.stroke(), ctx.closePath()
            }, Particle.prototype.updatePosition = function() {
                if (options.parallax) {
                    if (orientationSupport && !desktop) {
                        pointerX = (tiltX + 30) * (winW / 60);
                        pointerY = (tiltY + 30) * (winH / 60)
                    } else pointerX = mouseX, pointerY = mouseY;
                    this.parallaxTargX = (pointerX - winW / 2) / (options.parallaxMultiplier * this.layer), this.parallaxOffsetX += (this.parallaxTargX - this.parallaxOffsetX) / 10, this.parallaxTargY = (pointerY - winH / 2) / (options.parallaxMultiplier * this.layer), this.parallaxOffsetY += (this.parallaxTargY - this.parallaxOffsetY) / 10
                }
                var elWidth = element.offsetWidth,
                    elHeight = element.offsetHeight;
                switch (options.directionX) {
                    case "left":
                        this.position.x + this.speed.x + this.parallaxOffsetX < 0 && (this.position.x = elWidth - this.parallaxOffsetX);
                        break;
                    case "right":
                        this.position.x + this.speed.x + this.parallaxOffsetX > elWidth && (this.position.x = 0 - this.parallaxOffsetX);
                        break;
                    default:
                        (this.position.x + this.speed.x + this.parallaxOffsetX > elWidth || this.position.x + this.speed.x + this.parallaxOffsetX < 0) && (this.speed.x = -this.speed.x)
                }
                switch (options.directionY) {
                    case "up":
                        this.position.y + this.speed.y + this.parallaxOffsetY < 0 && (this.position.y = elHeight - this.parallaxOffsetY);
                        break;
                    case "down":
                        this.position.y + this.speed.y + this.parallaxOffsetY > elHeight && (this.position.y = 0 - this.parallaxOffsetY);
                        break;
                    default:
                        (this.position.y + this.speed.y + this.parallaxOffsetY > elHeight || this.position.y + this.speed.y + this.parallaxOffsetY < 0) && (this.speed.y = -this.speed.y)
                }
                this.position.x += this.speed.x, this.position.y += this.speed.y
            }, Particle.prototype.setStackPos = function(i) {
                this.stackPos = i
            },
            function() {
                if (canvasSupport) {
                    canvas = document.createElement("canvas"), canvas.className = "pg-canvas", canvas.style.display = "block", element.insertBefore(canvas, element.firstChild), ctx = canvas.getContext("2d"), styleCanvas();
                    for (var numParticles = Math.round(canvas.width * canvas.height / options.density), i = 0; i < numParticles; i++) {
                        var p = new Particle;
                        p.setStackPos(i), particles.push(p)
                    }
                    window.addEventListener("resize", function() {
                        resizeHandler()
                    }, !1), document.addEventListener("mousemove", function(e) {
                        mouseX = e.pageX, mouseY = e.pageY
                    }, !1), orientationSupport && !desktop && window.addEventListener("deviceorientation", function() {
                        tiltY = Math.min(Math.max(-event.beta, -30), 30), tiltX = Math.min(Math.max(-event.gamma, -30), 30)
                    }, !0), draw(), hook("onInit")
                }
            }(), {
                option: option,
                destroy: destroy,
                start: start,
                pause: pause
            }
    }

    var pluginName = "particleground",
        $ = window.jQuery;
    window[pluginName] = function(elem, options) {
        return new Plugin(elem, options)
    }, window[pluginName].defaults = {
        minSpeedX: .1,
        maxSpeedX: .7,
        minSpeedY: .1,
        maxSpeedY: .7,
        directionX: "center",
        directionY: "center",
        density: 1e4,
        dotColor: "#666666",
        lineColor: "#666666",
        particleRadius: 7,
        lineWidth: 1,
        curvedLines: !1,
        proximity: 100,
        parallax: !0,
        parallaxMultiplier: 5,
        onInit: function() {},
        onDestroy: function() {}
    }, $ && ($.fn[pluginName] = function(options) {
        if ("string" == typeof arguments[0]) {
            var returnVal, methodName = arguments[0],
                args = Array.prototype.slice.call(arguments, 1);
            return this.each(function() {
                $.data(this, "plugin_" + pluginName) && "function" == typeof $.data(this, "plugin_" + pluginName)[methodName] && (returnVal = $.data(this, "plugin_" + pluginName)[methodName].apply(this, args))
            }), void 0 !== returnVal ? returnVal : this
        }
        if ("object" == typeof options || !options) return this.each(function() {
            $.data(this, "plugin_" + pluginName) || $.data(this, "plugin_" + pluginName, new Plugin(this, options))
        })
    })
}(window, document);

$(function($) {
        var self = this,
            $header = $(".fullpage"),
            h = window.innerHeight;
        $header.css("min-height", h), $("#particles").particleground({
            dotColor: "rgba(255, 255, 255, 0.92)",
            lineColor: "rgba(255, 255, 255, 0.1)",
            minSpeedX: .1,
            maxSpeedX: .6,
            minSpeedY: .1,
            maxSpeedY: .6,
            lineWidth: 1,
            density: 12100,
            curvedLines: !1,
            proximity: 150,
            parallaxMultiplier: 10,
            particleRadius: 3
        });
    });