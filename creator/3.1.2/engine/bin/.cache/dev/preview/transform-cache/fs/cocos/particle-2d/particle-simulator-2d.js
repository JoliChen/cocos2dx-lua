System.register("q-bundled:///fs/cocos/particle-2d/particle-simulator-2d.js", ["../core/math/index.js", "../core/utils/pool.js", "../core/utils/misc.js", "../2d/renderer/vertex-format.js", "./define.js"], function (_export, _context) {
  "use strict";

  var Vec2, Color, Pool, clampf, degreesToRadians, radiansToDegrees, vfmtPosUvColor, getComponentPerVertex, PositionType, EmitterMode, START_SIZE_EQUAL_TO_END_SIZE, START_RADIUS_EQUAL_TO_END_RADIUS, ZERO_VEC2, _pos, _tpa, _tpb, _tpc, formatBytes, Particle, ParticlePool, pool, Simulator;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  // In the Free mode to get emit real rotation in the world coordinate.
  function getWorldRotation(node) {
    var rotation = 0;
    var tempNode = node;

    while (tempNode) {
      rotation += tempNode.eulerAngles.z;
      tempNode = tempNode.parent;
    }

    return rotation;
  }

  return {
    setters: [function (_coreMathIndexJs) {
      Vec2 = _coreMathIndexJs.Vec2;
      Color = _coreMathIndexJs.Color;
    }, function (_coreUtilsPoolJs) {
      Pool = _coreUtilsPoolJs.default;
    }, function (_coreUtilsMiscJs) {
      clampf = _coreUtilsMiscJs.clampf;
      degreesToRadians = _coreUtilsMiscJs.degreesToRadians;
      radiansToDegrees = _coreUtilsMiscJs.radiansToDegrees;
    }, function (_dRendererVertexFormatJs) {
      vfmtPosUvColor = _dRendererVertexFormatJs.vfmtPosUvColor;
      getComponentPerVertex = _dRendererVertexFormatJs.getComponentPerVertex;
    }, function (_defineJs) {
      PositionType = _defineJs.PositionType;
      EmitterMode = _defineJs.EmitterMode;
      START_SIZE_EQUAL_TO_END_SIZE = _defineJs.START_SIZE_EQUAL_TO_END_SIZE;
      START_RADIUS_EQUAL_TO_END_RADIUS = _defineJs.START_RADIUS_EQUAL_TO_END_RADIUS;
    }],
    execute: function () {
      ZERO_VEC2 = new Vec2(0, 0);
      _pos = new Vec2();
      _tpa = new Vec2();
      _tpb = new Vec2();
      _tpc = new Vec2();
      formatBytes = getComponentPerVertex(vfmtPosUvColor);

      Particle = function Particle() {
        this.pos = new Vec2(0, 0);
        this.startPos = new Vec2(0, 0);
        this.color = new Color(0, 0, 0, 255);
        this.deltaColor = {
          r: 0,
          g: 0,
          b: 0,
          a: 255
        };
        this.size = 0;
        this.deltaSize = 0;
        this.rotation = 0;
        this.deltaRotation = 0;
        this.timeToLive = 0;
        this.drawPos = new Vec2(0, 0);
        this.aspectRatio = 1;
        this.dir = new Vec2(0, 0);
        this.radialAccel = 0;
        this.tangentialAccel = 0;
        this.angle = 0;
        this.degreesPerSecond = 0;
        this.radius = 0;
        this.deltaRadius = 0;
      };

      ParticlePool = /*#__PURE__*/function (_Pool) {
        _inheritsLoose(ParticlePool, _Pool);

        function ParticlePool() {
          return _Pool.apply(this, arguments) || this;
        }

        var _proto = ParticlePool.prototype;

        _proto.get = function get() {
          return this._get() || new Particle();
        };

        return ParticlePool;
      }(Pool);

      pool = new ParticlePool(function (par) {
        par.pos.set(ZERO_VEC2);
        par.startPos.set(ZERO_VEC2);
        par.color._val = 0xFF000000;
        par.deltaColor.r = par.deltaColor.g = par.deltaColor.b = 0;
        par.deltaColor.a = 255;
        par.size = 0;
        par.deltaSize = 0;
        par.rotation = 0;
        par.deltaRotation = 0;
        par.timeToLive = 0;
        par.drawPos.set(ZERO_VEC2);
        par.aspectRatio = 1; // Mode A

        par.dir.set(ZERO_VEC2);
        par.radialAccel = 0;
        par.tangentialAccel = 0; // Mode B

        par.angle = 0;
        par.degreesPerSecond = 0;
        par.radius = 0;
        par.deltaRadius = 0;
      }, 1024);

      _export("Simulator", Simulator = /*#__PURE__*/function () {
        function Simulator(system) {
          this.particles = [];
          this.active = false;
          this.uvFilled = 0;
          this.finished = false;
          this.readyToPlay = true;
          this.elapsed = 0;
          this.emitCounter = 0;
          this._worldRotation = 0;
          this.sys = system;
          this.particles = [];
          this.active = false;
          this.readyToPlay = true;
          this.finished = false;
          this.elapsed = 0;
          this.emitCounter = 0;
          this.uvFilled = 0;
          this._worldRotation = 0;
        }

        var _proto2 = Simulator.prototype;

        _proto2.stop = function stop() {
          this.active = false;
          this.readyToPlay = false;
          this.elapsed = this.sys.duration;
          this.emitCounter = 0;
        };

        _proto2.reset = function reset() {
          this.active = true;
          this.readyToPlay = true;
          this.elapsed = 0;
          this.emitCounter = 0;
          this.finished = false;
          var particles = this.particles;

          for (var id = 0; id < particles.length; ++id) {
            pool.put(particles[id]);
          }

          particles.length = 0;
        };

        _proto2.emitParticle = function emitParticle(pos) {
          var psys = this.sys;
          var particle = pool.get();
          this.particles.push(particle); // Init particle
          // timeToLive
          // no negative life. prevent division by 0

          particle.timeToLive = psys.life + psys.lifeVar * (Math.random() - 0.5) * 2;
          var timeToLive = particle.timeToLive = Math.max(0, particle.timeToLive); // position

          particle.pos.x = psys.sourcePos.x + psys.posVar.x * (Math.random() - 0.5) * 2;
          particle.pos.y = psys.sourcePos.y + psys.posVar.y * (Math.random() - 0.5) * 2; // Color

          var sr = 0;
          var sg = 0;
          var sb = 0;
          var sa = 0;
          var startColor = psys.startColor;
          var startColorVar = psys.startColorVar;
          var endColor = psys.endColor;
          var endColorVar = psys.endColorVar;
          particle.color.r = sr = clampf(startColor.r + startColorVar.r * (Math.random() - 0.5) * 2, 0, 255);
          particle.color.g = sg = clampf(startColor.g + startColorVar.g * (Math.random() - 0.5) * 2, 0, 255);
          particle.color.b = sb = clampf(startColor.b + startColorVar.b * (Math.random() - 0.5) * 2, 0, 255);
          particle.color.a = sa = clampf(startColor.a + startColorVar.a * (Math.random() - 0.5) * 2, 0, 255);
          particle.deltaColor.r = (clampf(endColor.r + endColorVar.r * (Math.random() - 0.5) * 2, 0, 255) - sr) / timeToLive;
          particle.deltaColor.g = (clampf(endColor.g + endColorVar.g * (Math.random() - 0.5) * 2, 0, 255) - sg) / timeToLive;
          particle.deltaColor.b = (clampf(endColor.b + endColorVar.b * (Math.random() - 0.5) * 2, 0, 255) - sb) / timeToLive;
          particle.deltaColor.a = (clampf(endColor.a + endColorVar.a * (Math.random() - 0.5) * 2, 0, 255) - sa) / timeToLive; // size

          var startS = psys.startSize + psys.startSizeVar * (Math.random() - 0.5) * 2;
          startS = Math.max(0, startS); // No negative value

          particle.size = startS;

          if (psys.endSize === START_SIZE_EQUAL_TO_END_SIZE) {
            particle.deltaSize = 0;
          } else {
            var endS = psys.endSize + psys.endSizeVar * (Math.random() - 0.5) * 2;
            endS = Math.max(0, endS); // No negative values

            particle.deltaSize = (endS - startS) / timeToLive;
          } // rotation


          var startA = psys.startSpin + psys.startSpinVar * (Math.random() - 0.5) * 2;
          var endA = psys.endSpin + psys.endSpinVar * (Math.random() - 0.5) * 2;
          particle.rotation = startA;
          particle.deltaRotation = (endA - startA) / timeToLive; // position

          particle.startPos.x = pos.x;
          particle.startPos.y = pos.y; // aspect ratio

          particle.aspectRatio = psys.aspectRatio || 1; // direction

          var a = degreesToRadians(psys.angle + this._worldRotation + psys.angleVar * (Math.random() - 0.5) * 2); // Mode Gravity: A

          if (psys.emitterMode === EmitterMode.GRAVITY) {
            var s = psys.speed + psys.speedVar * (Math.random() - 0.5) * 2; // direction

            particle.dir.x = Math.cos(a);
            particle.dir.y = Math.sin(a);
            particle.dir.multiplyScalar(s); // radial accel

            particle.radialAccel = psys.radialAccel + psys.radialAccelVar * (Math.random() - 0.5) * 2; // tangential accel

            particle.tangentialAccel = psys.tangentialAccel + psys.tangentialAccelVar * (Math.random() - 0.5) * 2; // rotation is dir

            if (psys.rotationIsDir) {
              particle.rotation = -radiansToDegrees(Math.atan2(particle.dir.y, particle.dir.x));
            }
          } else {
            // Mode Radius: B
            // Set the default diameter of the particle from the source position
            var startRadius = psys.startRadius + psys.startRadiusVar * (Math.random() - 0.5) * 2;
            var endRadius = psys.endRadius + psys.endRadiusVar * (Math.random() - 0.5) * 2;
            particle.radius = startRadius;
            particle.deltaRadius = psys.endRadius === START_RADIUS_EQUAL_TO_END_RADIUS ? 0 : (endRadius - startRadius) / timeToLive;
            particle.angle = a;
            particle.degreesPerSecond = degreesToRadians(psys.rotatePerS + psys.rotatePerSVar * (Math.random() - 0.5) * 2);
          }
        };

        _proto2.updateUVs = function updateUVs(force) {
          var renderData = this.renderData;

          if (renderData && this.sys._renderSpriteFrame) {
            var vbuf = renderData.vData;
            var uv = this.sys._renderSpriteFrame.uv;
            var start = force ? 0 : this.uvFilled;
            var particleCount = this.particles.length;

            for (var i = start; i < particleCount; i++) {
              var offset = i * formatBytes * 4;
              vbuf[offset + 3] = uv[0];
              vbuf[offset + 4] = uv[1];
              vbuf[offset + 12] = uv[2];
              vbuf[offset + 13] = uv[3];
              vbuf[offset + 21] = uv[4];
              vbuf[offset + 22] = uv[5];
              vbuf[offset + 30] = uv[6];
              vbuf[offset + 31] = uv[7];
            }

            this.uvFilled = particleCount;
          }
        };

        _proto2.updateParticleBuffer = function updateParticleBuffer(particle, pos, buffer, offset) {
          var vbuf = buffer.vData; // const uintbuf = buffer._uintVData;

          var x = pos.x;
          var y = pos.y;
          var width = particle.size;
          var height = width;
          var aspectRatio = particle.aspectRatio;

          if (aspectRatio > 1) {
            height = width / aspectRatio;
          } else {
            width = height * aspectRatio;
          }

          var halfWidth = width / 2;
          var halfHeight = height / 2; // pos

          if (particle.rotation) {
            var x1 = -halfWidth;
            var y1 = -halfHeight;
            var x2 = halfWidth;
            var y2 = halfHeight;
            var rad = -degreesToRadians(particle.rotation);
            var cr = Math.cos(rad);
            var sr = Math.sin(rad); // bl

            vbuf[offset] = x1 * cr - y1 * sr + x;
            vbuf[offset + 1] = x1 * sr + y1 * cr + y;
            vbuf[offset + 2] = 0; // br

            vbuf[offset + 9] = x2 * cr - y1 * sr + x;
            vbuf[offset + 10] = x2 * sr + y1 * cr + y;
            vbuf[offset + 11] = 0; // tl

            vbuf[offset + 18] = x1 * cr - y2 * sr + x;
            vbuf[offset + 19] = x1 * sr + y2 * cr + y;
            vbuf[offset + 20] = 0; // tr

            vbuf[offset + 27] = x2 * cr - y2 * sr + x;
            vbuf[offset + 28] = x2 * sr + y2 * cr + y;
            vbuf[offset + 29] = 0;
          } else {
            // bl
            vbuf[offset] = x - halfWidth;
            vbuf[offset + 1] = y - halfHeight;
            vbuf[offset + 2] = 0; // br

            vbuf[offset + 9] = x + halfWidth;
            vbuf[offset + 10] = y - halfHeight;
            vbuf[offset + 11] = 0; // tl

            vbuf[offset + 18] = x - halfWidth;
            vbuf[offset + 19] = y + halfHeight;
            vbuf[offset + 20] = 0; // tr

            vbuf[offset + 27] = x + halfWidth;
            vbuf[offset + 28] = y + halfHeight;
            vbuf[offset + 29] = 0;
          } // color


          Color.toArray(vbuf, particle.color, offset + 5);
          Color.toArray(vbuf, particle.color, offset + 14);
          Color.toArray(vbuf, particle.color, offset + 23);
          Color.toArray(vbuf, particle.color, offset + 32);
        };

        _proto2.step = function step(dt) {
          var assembler = this.sys.assembler;
          var psys = this.sys;
          var node = psys.node;
          var particles = this.particles;
          dt = dt > assembler.maxParticleDeltaTime ? assembler.maxParticleDeltaTime : dt; // Calculate pos

          node.updateWorldTransform();

          if (psys.positionType === PositionType.FREE) {
            this._worldRotation = getWorldRotation(node);
            var m = node.worldMatrix;
            _pos.x = m.m12;
            _pos.y = m.m13;
          } else if (psys.positionType === PositionType.RELATIVE) {
            this._worldRotation = node.eulerAngles.z;
            _pos.x = node.position.x;
            _pos.y = node.position.y;
          } else {
            this._worldRotation = 0;
          } // Emission


          if (this.active && psys.emissionRate) {
            var rate = 1.0 / psys.emissionRate; // issue #1201, prevent bursts of particles, due to too high emitCounter

            if (particles.length < psys.totalParticles) this.emitCounter += dt;

            while (particles.length < psys.totalParticles && this.emitCounter > rate) {
              this.emitParticle(_pos);
              this.emitCounter -= rate;
            }

            this.elapsed += dt;

            if (psys.duration !== -1 && psys.duration < this.elapsed) {
              psys.stopSystem();
            }
          } // Request buffer for particles


          var renderData = this.renderData;
          var particleCount = particles.length;
          renderData.reset();
          this.requestData(particleCount * 4, particleCount * 6); // Fill up uvs

          if (particleCount > this.uvFilled) {
            this.updateUVs();
          } // Used to reduce memory allocation / creation within the loop


          var particleIdx = 0;

          while (particleIdx < particles.length) {
            // Reset temporary vectors
            _tpa.x = _tpa.y = _tpb.x = _tpb.y = _tpc.x = _tpc.y = 0;
            var particle = particles[particleIdx]; // life

            particle.timeToLive -= dt;

            if (particle.timeToLive > 0) {
              // Mode A: gravity, direction, tangential accel & radial accel
              if (psys.emitterMode === EmitterMode.GRAVITY) {
                var tmp = _tpc;
                var radial = _tpa;
                var tangential = _tpb; // radial acceleration

                if (particle.pos.x || particle.pos.y) {
                  radial.set(particle.pos);
                  radial.normalize();
                }

                tangential.set(radial);
                radial.multiplyScalar(particle.radialAccel); // tangential acceleration

                var newy = tangential.x;
                tangential.x = -tangential.y;
                tangential.y = newy;
                tangential.multiplyScalar(particle.tangentialAccel);
                tmp.set(radial);
                tmp.add(tangential);
                tmp.add(psys.gravity);
                tmp.multiplyScalar(dt);
                particle.dir.add(tmp);
                tmp.set(particle.dir);
                tmp.multiplyScalar(dt);
                particle.pos.add(tmp);
              } else {
                // Mode B: radius movement
                // Update the angle and radius of the particle.
                particle.angle += particle.degreesPerSecond * dt;
                particle.radius += particle.deltaRadius * dt;
                particle.pos.x = -Math.cos(particle.angle) * particle.radius;
                particle.pos.y = -Math.sin(particle.angle) * particle.radius;
              } // color


              particle.color.r += particle.deltaColor.r * dt;
              particle.color.g += particle.deltaColor.g * dt;
              particle.color.b += particle.deltaColor.b * dt;
              particle.color.a += particle.deltaColor.a * dt; // size

              particle.size += particle.deltaSize * dt;

              if (particle.size < 0) {
                particle.size = 0;
              } // angle


              particle.rotation += particle.deltaRotation * dt; // update values in quad buffer

              var newPos = _tpa;
              newPos.set(particle.pos);

              if (psys.positionType !== PositionType.GROUPED) {
                newPos.add(particle.startPos);
              }

              var offset = formatBytes * particleIdx * 4;
              this.updateParticleBuffer(particle, newPos, renderData, offset); // update particle counter

              ++particleIdx;
            } else {
              // life < 0
              var deadParticle = particles[particleIdx];

              if (particleIdx !== particles.length - 1) {
                particles[particleIdx] = particles[particles.length - 1];
              }

              pool.put(deadParticle);
              particles.length--;
              renderData.indicesCount -= 6;
              renderData.vertexCount -= 4;
            }
          }

          if (particles.length === 0 && !this.active && !this.readyToPlay) {
            this.finished = true;

            psys._finishedSimulation();
          }
        };

        _proto2.requestData = function requestData(vertexCount, indicesCount) {
          var offset = this.renderData.indicesCount;
          this.renderData.request(vertexCount, indicesCount);
          var count = this.renderData.indicesCount / 6;
          var buffer = this.renderData.iData;

          for (var i = offset; i < count; i++) {
            var vId = i * 4;
            buffer[offset++] = vId;
            buffer[offset++] = vId + 1;
            buffer[offset++] = vId + 2;
            buffer[offset++] = vId + 1;
            buffer[offset++] = vId + 3;
            buffer[offset++] = vId + 2;
          }
        };

        return Simulator;
      }());
    }
  };
});