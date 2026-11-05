"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../../../OneDrive/Documentos/Midron/src/scripts.ts
var scripts_exports = {};
__export(scripts_exports, {
  _applyScriptsForObject: () => _applyScriptsForObject,
  _preloadScriptsAssets: () => _preloadScriptsAssets,
  _removeRegisteredScriptInstance: () => _removeRegisteredScriptInstance,
  getDefaultRenderingPipeline: () => getDefaultRenderingPipeline,
  getMotionBlurPostProcess: () => getMotionBlurPostProcess,
  getSSAO2RenderingPipeline: () => getSSAO2RenderingPipeline,
  getSSRRenderingPipeline: () => getSSRRenderingPipeline,
  getTAARenderingPipeline: () => getTAARenderingPipeline,
  getVLSPostProcess: () => getVLSPostProcess,
  getVolumetricLightingRenderingPipeline: () => getVolumetricLightingRenderingPipeline,
  loadScene: () => loadScene,
  scriptAssetsCache: () => scriptAssetsCache,
  scriptsDictionary: () => scriptsDictionary,
  scriptsMap: () => scriptsMap
});
module.exports = __toCommonJS(scripts_exports);

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/loader.js
var import_babylonjs79 = require("babylonjs");
var import_babylonjs80 = require("babylonjs");
var import_babylonjs81 = require("babylonjs");
var import_babylonjs82 = require("babylonjs");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/tools/guards.js
function isAbstractMesh(object) {
  switch (object.getClassName?.()) {
    case "Mesh":
    case "LineMesh":
    case "GroundMesh":
    case "InstancedMesh":
      return true;
  }
  return false;
}
__name(isAbstractMesh, "isAbstractMesh");
function isMesh(object) {
  switch (object.getClassName?.()) {
    case "Mesh":
    case "GroundMesh":
      return true;
  }
  return false;
}
__name(isMesh, "isMesh");
function isInstancedMesh(object) {
  return object.getClassName?.() === "InstancedMesh";
}
__name(isInstancedMesh, "isInstancedMesh");
function isTransformNode(object) {
  return object.getClassName?.() === "TransformNode";
}
__name(isTransformNode, "isTransformNode");
function isTexture(object) {
  return object?.getClassName?.() === "Texture";
}
__name(isTexture, "isTexture");
function isCamera(object) {
  switch (object.getClassName?.()) {
    case "Camera":
    case "FreeCamera":
    case "TargetCamera":
    case "EditorCamera":
    case "ArcRotateCamera":
    case "UniversalCamera":
      return true;
  }
  return false;
}
__name(isCamera, "isCamera");
function isDirectionalLight(object) {
  return object.getClassName?.() === "DirectionalLight";
}
__name(isDirectionalLight, "isDirectionalLight");
function isSpotLight(object) {
  return object.getClassName?.() === "SpotLight";
}
__name(isSpotLight, "isSpotLight");
function isHemisphericLight(object) {
  return object.getClassName?.() === "HemisphericLight";
}
__name(isHemisphericLight, "isHemisphericLight");
function isLight(object) {
  switch (object.getClassName?.()) {
    case "Light":
    case "PointLight":
    case "SpotLight":
    case "DirectionalLight":
    case "HemisphericLight":
      return true;
  }
  return false;
}
__name(isLight, "isLight");
function isShadowGenerator(object) {
  return object.getClassName?.() === "ShadowGenerator";
}
__name(isShadowGenerator, "isShadowGenerator");
function isCascadedShadowGenerator(object) {
  return object.getClassName?.() === "CascadedShadowGenerator";
}
__name(isCascadedShadowGenerator, "isCascadedShadowGenerator");
function isClusteredLightContainer(object) {
  return object.getClassName?.() === "ClusteredLightContainer";
}
__name(isClusteredLightContainer, "isClusteredLightContainer");
function isNode(object) {
  return isAbstractMesh(object) || isTransformNode(object) || isLight(object) || isCamera(object);
}
__name(isNode, "isNode");
function isScene(object) {
  return object.getClassName?.() === "Scene";
}
__name(isScene, "isScene");
function isParticleSystem(object) {
  return object.getClassName?.() === "ParticleSystem";
}
__name(isParticleSystem, "isParticleSystem");
function isAnyParticleSystem(object) {
  switch (object.getClassName?.()) {
    case "ParticleSystem":
    case "GPUParticleSystem":
      return true;
  }
  return false;
}
__name(isAnyParticleSystem, "isAnyParticleSystem");
function isSprite(object) {
  return object.getClassName?.() === "Sprite";
}
__name(isSprite, "isSprite");
function isSoundNode(object) {
  return object.getClassName?.() === "SoundNode";
}
__name(isSoundNode, "isSoundNode");
function isGaussianSplattingMesh(object) {
  return object.getClassName?.() === "GaussianSplattingMesh";
}
__name(isGaussianSplattingMesh, "isGaussianSplattingMesh");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/tools/mesh.js
function configureMeshDistanceOrScreenCoverage(scene) {
  scene.meshes.forEach((mesh) => {
    if (!isMesh(mesh)) {
      return;
    }
    mesh.getLODLevels().forEach((lod) => {
      if (lod.mesh) {
        lod.mesh.originalDistanceOrScreenCoverage = lod.distanceOrScreenCoverage;
      }
    });
  });
}
__name(configureMeshDistanceOrScreenCoverage, "configureMeshDistanceOrScreenCoverage");
function applyMeshesLODQuality(quality, scene) {
  scene.meshes.forEach((mesh) => {
    if (!isMesh(mesh)) {
      return;
    }
    mesh.getLODLevels().forEach((lod) => {
      if (!lod.mesh?.originalDistanceOrScreenCoverage) {
        return;
      }
      switch (quality) {
        case "very-low":
          lod.distanceOrScreenCoverage = lod.mesh.originalDistanceOrScreenCoverage * 0.125;
          break;
        case "low":
          lod.distanceOrScreenCoverage = lod.mesh.originalDistanceOrScreenCoverage * 0.25;
          break;
        case "medium":
          lod.distanceOrScreenCoverage = lod.mesh.originalDistanceOrScreenCoverage * 0.5;
          break;
        case "high":
          lod.distanceOrScreenCoverage = lod.mesh.originalDistanceOrScreenCoverage;
          break;
      }
    });
  });
}
__name(applyMeshesLODQuality, "applyMeshesLODQuality");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/tools/light.js
var import_babylonjs = require("babylonjs");
var import_babylonjs2 = require("babylonjs");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/tools/scalar.js
function getPowerOfTwoUntil(limit) {
  let size = 1;
  while (size <= limit) {
    size <<= 1;
  }
  return size >> 1;
}
__name(getPowerOfTwoUntil, "getPowerOfTwoUntil");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/tools/light.js
function configureShadowMapRenderListPredicate(scene) {
  scene.lights.forEach((light) => {
    const shadowMap = light.getShadowGenerator()?.getShadowMap();
    if (!shadowMap) {
      return;
    }
    shadowMap.renderListPredicate = (mesh) => {
      if (isGaussianSplattingMesh(mesh)) {
        return false;
      }
      const distance = import_babylonjs.Vector3.Distance(mesh.getAbsolutePosition(), light.getAbsolutePosition());
      return distance <= light.range;
    };
  });
}
__name(configureShadowMapRenderListPredicate, "configureShadowMapRenderListPredicate");
async function configureShadowMapRefreshRate(scene) {
  scene.executeWhenReady(() => {
    scene.lights.forEach((light) => {
      const shadowMap = light.getShadowGenerator()?.getShadowMap();
      if (shadowMap) {
        shadowMap.refreshRate = light.metadata?.refreshRate ?? import_babylonjs2.RenderTargetTexture.REFRESHRATE_RENDER_ONEVERYFRAME;
      }
    });
  });
}
__name(configureShadowMapRefreshRate, "configureShadowMapRefreshRate");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/rendering/tools.js
var import_babylonjs32 = require("babylonjs");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/rendering/order.js
var renderingPipelinesOrder = [
  "SSAO2RenderingPipeline",
  "VolumetricLightingRenderingPipeline",
  "VolumetricLightScatteringPostProcess",
  "SSRRenderingPipeline",
  "MotionBlurPostProcess",
  "DefaultRenderingPipeline",
  "TAARenderingPipeline"
];
var ranks = /* @__PURE__ */ new Map();
var sceneObservers = /* @__PURE__ */ new WeakMap();
function getRenderEffects(pipeline) {
  return Object.values(pipeline._renderEffects ?? {});
}
__name(getRenderEffects, "getRenderEffects");
function sortCameraPostProcesses(camera) {
  const scene = camera.getScene();
  const chain = camera._postProcesses;
  if (!chain?.length) {
    return false;
  }
  ranks.clear();
  const pipelines = scene.postProcessRenderPipelineManager?.supportedPipelines ?? [];
  pipelines.forEach((pipeline) => {
    const rank = renderingPipelinesOrder.indexOf(pipeline.getClassName());
    if (rank === -1) {
      return;
    }
    getRenderEffects(pipeline).forEach((renderEffect) => {
      renderEffect.getPostProcesses(camera)?.forEach((postProcess) => ranks.set(postProcess, rank));
    });
  });
  const slots = [];
  let lastRank = -1;
  let sorted = true;
  chain.forEach((postProcess, index) => {
    if (!postProcess) {
      return;
    }
    let rank = ranks.get(postProcess);
    if (rank === void 0) {
      rank = renderingPipelinesOrder.indexOf(postProcess.getClassName());
      if (rank === -1) {
        return;
      }
      ranks.set(postProcess, rank);
    }
    slots.push(index);
    if (rank < lastRank) {
      sorted = false;
    }
    lastRank = Math.max(lastRank, rank);
  });
  if (sorted) {
    return false;
  }
  const postProcesses = slots.map((index) => chain[index]).sort((a, b) => ranks.get(a) - ranks.get(b));
  slots.forEach((index, i) => chain[index] = postProcesses[i]);
  pipelines.forEach((pipeline) => {
    if (renderingPipelinesOrder.indexOf(pipeline.getClassName()) === -1) {
      return;
    }
    getRenderEffects(pipeline).forEach((renderEffect) => {
      const indices = renderEffect._indicesForCamera;
      const effectPostProcesses = renderEffect.getPostProcesses(camera);
      if (indices?.[camera.name] && effectPostProcesses) {
        indices[camera.name] = effectPostProcesses.map((postProcess) => chain.indexOf(postProcess));
      }
    });
  });
  camera._cascadePostProcessesToRigCams?.();
  scene.prePassRenderer?.markAsDirty();
  return true;
}
__name(sortCameraPostProcesses, "sortCameraPostProcesses");
function keepRenderingPipelinesOrdered(scene) {
  if (sceneObservers.has(scene)) {
    return;
  }
  const observer = scene.onBeforeCameraRenderObservable.add((camera) => sortCameraPostProcesses(camera));
  sceneObservers.set(scene, observer);
  scene.onDisposeObservable.addOnce(() => sceneObservers.delete(scene));
}
__name(keepRenderingPipelinesOrdered, "keepRenderingPipelinesOrdered");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/rendering/vls.js
var import_babylonjs3 = require("babylonjs");
var import_babylonjs4 = require("babylonjs");
var import_babylonjs5 = require("babylonjs");
var vlsPostProcess = null;
var vlsPostProcessCameraConfigurations = /* @__PURE__ */ new Map();
function getVLSPostProcess() {
  return vlsPostProcess;
}
__name(getVLSPostProcess, "getVLSPostProcess");
function disposeVLSPostProcess(scene) {
  if (vlsPostProcess && scene.activeCamera) {
    vlsPostProcess.dispose(scene.activeCamera);
    vlsPostProcess = null;
  }
}
__name(disposeVLSPostProcess, "disposeVLSPostProcess");
function createVLSPostProcess(scene, mesh, options) {
  mesh ??= scene.meshes.find((mesh2) => isMesh(mesh2));
  vlsPostProcess = new import_babylonjs5.VolumetricLightScatteringPostProcess("VolumetricLightScatteringPostProcess", 1, scene.activeCamera, mesh, 100, import_babylonjs4.Texture.BILINEAR_SAMPLINGMODE, scene.getEngine(), false);
  vlsPostProcess.samples = options?.msaaSamples ?? 1;
  return vlsPostProcess;
}
__name(createVLSPostProcess, "createVLSPostProcess");
function parseVLSPostProcess(scene, data, options) {
  let mesh = null;
  if (data.meshId) {
    const result = scene.getMeshById(data.meshId);
    if (result && isMesh(result)) {
      mesh = result;
    }
  }
  const pipeline = vlsPostProcess ?? createVLSPostProcess(scene, mesh, options);
  pipeline.samples = options?.msaaSamples ?? 1;
  pipeline.exposure = data.exposure;
  pipeline.decay = data.decay;
  pipeline.weight = data.weight;
  pipeline.density = data.density;
  pipeline.invert = data.invert;
  pipeline.useCustomMeshPosition = data.useCustomMeshPosition;
  pipeline.customMeshPosition.copyFrom(import_babylonjs3.Vector3.FromArray(data.customMeshPosition));
  return pipeline;
}
__name(parseVLSPostProcess, "parseVLSPostProcess");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/rendering/ssr.js
var import_babylonjs6 = require("babylonjs");
var ssrRenderingPipeline = null;
var ssrRenderingPipelineCameraConfigurations = /* @__PURE__ */ new Map();
function getSSRRenderingPipeline() {
  return ssrRenderingPipeline;
}
__name(getSSRRenderingPipeline, "getSSRRenderingPipeline");
function disposeSSRRenderingPipeline() {
  if (ssrRenderingPipeline) {
    ssrRenderingPipeline.dispose();
    ssrRenderingPipeline = null;
  }
}
__name(disposeSSRRenderingPipeline, "disposeSSRRenderingPipeline");
function createSSRRenderingPipeline(scene, camera, options) {
  ssrRenderingPipeline = new import_babylonjs6.SSRRenderingPipeline("SSRRenderingPipeline", scene, [camera], void 0, getHdrTextureType(scene.getEngine()));
  ssrRenderingPipeline.samples = options?.msaaSamples ?? 1;
  return ssrRenderingPipeline;
}
__name(createSSRRenderingPipeline, "createSSRRenderingPipeline");
function parseSSRRenderingPipeline(scene, camera, data, options) {
  const pipeline = ssrRenderingPipeline ?? createSSRRenderingPipeline(scene, camera, options);
  pipeline.samples = options?.msaaSamples ?? 1;
  pipeline.step = data.step;
  pipeline.thickness = data.thickness;
  pipeline.strength = data.strength;
  pipeline.reflectionSpecularFalloffExponent = data.reflectionSpecularFalloffExponent;
  pipeline.maxSteps = data.maxSteps;
  pipeline.maxDistance = data.maxDistance;
  pipeline.roughnessFactor = data.roughnessFactor;
  pipeline.reflectivityThreshold = data.reflectivityThreshold;
  pipeline.blurDispersionStrength = data.blurDispersionStrehgth;
  pipeline.clipToFrustum = data.clipToFrustum;
  pipeline.enableSmoothReflections = data.enableSmoothReflections;
  pipeline.enableAutomaticThicknessComputation = data.enableAutomaticThicknessComputation;
  pipeline.attenuateFacingCamera = data.attenuateFacingCamera;
  pipeline.attenuateScreenBorders = data.attenuateScreenBorders;
  pipeline.attenuateIntersectionDistance = data.attenuateIntersectionDistance;
  pipeline.attenuateBackfaceReflection = data.attenuateBackfaceReflection;
  pipeline.blurDownsample = data.blurDownsample;
  pipeline.selfCollisionNumSkip = data.selfCollisionNumSkip;
  pipeline.ssrDownsample = data.ssrDownsample;
  pipeline.backfaceDepthTextureDownsample = data.backfaceDepthTextureDownsample;
  return pipeline;
}
__name(parseSSRRenderingPipeline, "parseSSRRenderingPipeline");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/rendering/taa.js
var import_babylonjs7 = require("babylonjs");
var taaRenderingPipeline = null;
var taaRenderingPipelineCameraConfigurations = /* @__PURE__ */ new Map();
function getTAARenderingPipeline() {
  return taaRenderingPipeline;
}
__name(getTAARenderingPipeline, "getTAARenderingPipeline");
function disposeTAARenderingPipeline() {
  if (taaRenderingPipeline) {
    taaRenderingPipeline.dispose();
    taaRenderingPipeline = null;
  }
}
__name(disposeTAARenderingPipeline, "disposeTAARenderingPipeline");
function createTAARenderingPipeline(scene, camera, options) {
  taaRenderingPipeline = new import_babylonjs7.TAARenderingPipeline("TAARenderingPipeline", scene, [camera], getHdrTextureType(scene.getEngine()));
  taaRenderingPipeline.msaaSamples = options?.msaaSamples ?? 1;
  return taaRenderingPipeline;
}
__name(createTAARenderingPipeline, "createTAARenderingPipeline");
function parseTAARenderingPipeline(scene, camera, data, options) {
  const pipeline = taaRenderingPipeline ?? createTAARenderingPipeline(scene, camera, options);
  pipeline.msaaSamples = options?.msaaSamples ?? 1;
  pipeline.factor = data.factor;
  pipeline.clampHistory = data.clampHistory;
  pipeline.reprojectHistory = data.reprojectHistory;
  pipeline.disableOnCameraMove = data.disableOnCameraMove;
  return pipeline;
}
__name(parseTAARenderingPipeline, "parseTAARenderingPipeline");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/rendering/ssao.js
var import_babylonjs8 = require("babylonjs");
var ssaoRenderingPipeline = null;
var ssaoRenderingPipelineCameraConfigurations = /* @__PURE__ */ new Map();
function getSSAO2RenderingPipeline() {
  return ssaoRenderingPipeline;
}
__name(getSSAO2RenderingPipeline, "getSSAO2RenderingPipeline");
function disposeSSAO2RenderingPipeline() {
  if (ssaoRenderingPipeline) {
    ssaoRenderingPipeline.dispose();
    ssaoRenderingPipeline = null;
  }
}
__name(disposeSSAO2RenderingPipeline, "disposeSSAO2RenderingPipeline");
function createSSAO2RenderingPipeline(scene, camera, _options) {
  ssaoRenderingPipeline = new import_babylonjs8.SSAO2RenderingPipeline("SSAO2RenderingPipeline", scene, 1, [camera], false, getHdrTextureType(scene.getEngine()));
  ssaoRenderingPipeline.textureSamples = 1;
  return ssaoRenderingPipeline;
}
__name(createSSAO2RenderingPipeline, "createSSAO2RenderingPipeline");
function parseSSAO2RenderingPipeline(scene, camera, data, options) {
  const pipeline = ssaoRenderingPipeline ?? createSSAO2RenderingPipeline(scene, camera, options);
  pipeline.textureSamples = 1;
  pipeline.radius = data.radius;
  pipeline.totalStrength = data.totalStrength;
  pipeline.samples = data.samples;
  pipeline.maxZ = data.maxZ;
  pipeline.minZAspect = data.minZAspect;
  pipeline.epsilon = data.epsilon;
  pipeline.bypassBlur = data.bypassBlur;
  pipeline.bilateralSamples = data.bilateralSamples;
  pipeline.bilateralSoften = data.bilateralSoften;
  pipeline.bilateralTolerance = data.bilateralTolerance;
  pipeline.expensiveBlur = data.expensiveBlur;
  return pipeline;
}
__name(parseSSAO2RenderingPipeline, "parseSSAO2RenderingPipeline");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/rendering/motion-blur.js
var import_babylonjs9 = require("babylonjs");
var motionBlurPostProcess = null;
var motionBlurPostProcessCameraConfigurations = /* @__PURE__ */ new Map();
function getMotionBlurPostProcess() {
  return motionBlurPostProcess;
}
__name(getMotionBlurPostProcess, "getMotionBlurPostProcess");
function disposeMotionBlurPostProcess() {
  if (motionBlurPostProcess) {
    motionBlurPostProcess.dispose();
    motionBlurPostProcess = null;
  }
}
__name(disposeMotionBlurPostProcess, "disposeMotionBlurPostProcess");
function createMotionBlurPostProcess(scene, camera, options) {
  motionBlurPostProcess = new import_babylonjs9.MotionBlurPostProcess("MotionBlurPostProcess", scene, 1, camera, void 0, void 0, void 0, getHdrTextureType(scene.getEngine()));
  motionBlurPostProcess.samples = options?.msaaSamples ?? 1;
  motionBlurPostProcess.motionStrength = 1;
  motionBlurPostProcess.isObjectBased = true;
  return motionBlurPostProcess;
}
__name(createMotionBlurPostProcess, "createMotionBlurPostProcess");
function parseMotionBlurPostProcess(scene, camera, data, options) {
  const postProcess = motionBlurPostProcess ?? createMotionBlurPostProcess(scene, camera, options);
  postProcess.samples = options?.msaaSamples ?? 1;
  postProcess.isObjectBased = data.isObjectBased;
  postProcess.motionStrength = data.motionStrength;
  postProcess.motionBlurSamples = data.motionBlurSamples;
  return postProcess;
}
__name(parseMotionBlurPostProcess, "parseMotionBlurPostProcess");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/rendering/default-pipeline.js
var import_babylonjs10 = require("babylonjs");
var import_babylonjs11 = require("babylonjs");
var import_babylonjs12 = require("babylonjs");
var import_babylonjs13 = require("babylonjs");
var import_babylonjs14 = require("babylonjs");
var defaultRenderingPipeline = null;
var defaultPipelineCameraConfigurations = /* @__PURE__ */ new Map();
function getDefaultRenderingPipeline() {
  return defaultRenderingPipeline;
}
__name(getDefaultRenderingPipeline, "getDefaultRenderingPipeline");
function disposeDefaultRenderingPipeline() {
  if (defaultRenderingPipeline) {
    defaultRenderingPipeline.dispose();
    defaultRenderingPipeline = null;
  }
}
__name(disposeDefaultRenderingPipeline, "disposeDefaultRenderingPipeline");
function createDefaultRenderingPipeline(scene, camera, options) {
  defaultRenderingPipeline = new import_babylonjs14.DefaultRenderingPipeline("DefaultRenderingPipeline", true, scene, [camera]);
  defaultRenderingPipeline.samples = options?.msaaSamples ?? 1;
  defaultRenderingPipeline.depthOfField.lensSize = 512;
  defaultRenderingPipeline.depthOfField.fStop = 0.25;
  defaultRenderingPipeline.depthOfField.focusDistance = 55e3;
  return defaultRenderingPipeline;
}
__name(createDefaultRenderingPipeline, "createDefaultRenderingPipeline");
function parseDefaultRenderingPipeline(scene, camera, data, rootUrl, options) {
  const pipeline = defaultRenderingPipeline ?? createDefaultRenderingPipeline(scene, camera, options);
  pipeline.samples = options?.msaaSamples ?? 1;
  pipeline.fxaaEnabled = data.fxaaEnabled;
  pipeline.imageProcessingEnabled = data.imageProcessingEnabled;
  if (pipeline.imageProcessing) {
    pipeline.imageProcessing.exposure = data.exposure;
    pipeline.imageProcessing.contrast = data.contrast;
    pipeline.imageProcessing.fromLinearSpace = data.fromLinearSpace;
    pipeline.imageProcessing.toneMappingEnabled = data.toneMappingEnabled;
    pipeline.imageProcessing.toneMappingType = data.toneMappingType;
    pipeline.imageProcessing.ditheringEnabled = data.ditheringEnabled;
    pipeline.imageProcessing.ditheringIntensity = data.ditheringIntensity;
    pipeline.imageProcessing.vignetteEnabled = data.vignetteEnabled ?? false;
    pipeline.imageProcessing.vignetteColor = import_babylonjs10.Color4.FromArray(data.vignetteColor ?? [0, 0, 0]);
    pipeline.imageProcessing.vignetteWeight = data.vignetteWeight ?? 0.3;
    pipeline.imageProcessing.colorGradingEnabled = data.colorGradingEnabled ?? false;
    pipeline.imageProcessing.imageProcessingConfiguration.colorGradingWithGreenDepth = data.colorGradingWithGreenDepth ?? true;
    if (data.colorGradingTexture) {
      let texture = null;
      if (data.colorGradingTexture.customType === "BABYLON.ColorGradingTexture") {
        const absoluteUrl = rootUrl + data.colorGradingTexture.name;
        texture = new import_babylonjs13.ColorGradingTexture(absoluteUrl, scene);
        texture.level = data.colorGradingTexture.level;
      } else {
        const parsedTexture = import_babylonjs12.Texture.Parse(data.colorGradingTexture, scene, rootUrl);
        if (isTexture(parsedTexture)) {
          texture = parsedTexture;
        }
      }
      pipeline.imageProcessing.colorGradingTexture = texture;
    }
    pipeline.imageProcessing.colorCurvesEnabled = data.colorCurvesEnabled ?? false;
    if (pipeline.imageProcessing.colorCurves) {
      pipeline.imageProcessing.colorCurves.globalHue = data.globalHue ?? 30;
      pipeline.imageProcessing.colorCurves.globalDensity = data.globalDensity ?? 0;
      pipeline.imageProcessing.colorCurves.globalExposure = data.globalExposure ?? 0;
      pipeline.imageProcessing.colorCurves.globalSaturation = data.globalSaturation ?? 0;
      pipeline.imageProcessing.colorCurves.highlightsHue = data.highlightsHue ?? 30;
      pipeline.imageProcessing.colorCurves.highlightsDensity = data.highlightsDensity ?? 0;
      pipeline.imageProcessing.colorCurves.highlightsExposure = data.highlightsExposure ?? 0;
      pipeline.imageProcessing.colorCurves.highlightsSaturation = data.highlightsSaturation ?? 0;
      pipeline.imageProcessing.colorCurves.midtonesHue = data.midtonesHue ?? 30;
      pipeline.imageProcessing.colorCurves.midtonesDensity = data.midtonesDensity ?? 0;
      pipeline.imageProcessing.colorCurves.midtonesExposure = data.midtonesExposure ?? 0;
      pipeline.imageProcessing.colorCurves.midtonesSaturation = data.midtonesSaturation ?? 0;
      pipeline.imageProcessing.colorCurves.shadowsHue = data.shadowsHue ?? 30;
      pipeline.imageProcessing.colorCurves.shadowsDensity = data.shadowsDensity ?? 0;
      pipeline.imageProcessing.colorCurves.shadowsExposure = data.shadowsExposure ?? 0;
      pipeline.imageProcessing.colorCurves.shadowsSaturation = data.shadowsSaturation ?? 0;
    }
  }
  pipeline.bloomEnabled = data.bloomEnabled;
  pipeline.bloomThreshold = data.bloomThreshold;
  pipeline.bloomWeight = data.bloomWeight;
  pipeline.bloomScale = data.bloomScale;
  pipeline.bloomKernel = data.bloomKernel;
  pipeline.sharpenEnabled = data.sharpenEnabled;
  pipeline.sharpen.edgeAmount = data.sharpenEdgeAmount;
  pipeline.sharpen.colorAmount = data.sharpenColorAmount;
  pipeline.grainEnabled = data.grainEnabled;
  pipeline.grain.intensity = data.grainIntensity;
  pipeline.grain.animated = data.grainAnimated;
  pipeline.depthOfFieldEnabled = data.depthOfFieldEnabled;
  pipeline.depthOfFieldBlurLevel = data.depthOfFieldBlurLevel;
  pipeline.depthOfField.lensSize = data.lensSize;
  pipeline.depthOfField.fStop = data.fStop;
  pipeline.depthOfField.focusDistance = data.focusDistance;
  pipeline.depthOfField.focalLength = data.focalLength;
  pipeline.chromaticAberrationEnabled = data.chromaticAberrationEnabled ?? false;
  pipeline.chromaticAberration.aberrationAmount = data.aberrationAmount ?? 10;
  pipeline.chromaticAberration.radialIntensity = data.radialIntensity ?? 1;
  pipeline.chromaticAberration.direction = import_babylonjs11.Vector2.FromArray(data.direction ?? [0, 0]);
  pipeline.chromaticAberration.centerPosition = import_babylonjs11.Vector2.FromArray(data.centerPosition ?? [0, 0]);
  pipeline.glowLayerEnabled = data.glowLayerEnabled ?? false;
  if (pipeline.glowLayer) {
    pipeline.glowLayer.intensity = data.glowLayerIntensity ?? 1;
    pipeline.glowLayer.blurKernelSize = data.glowLayerBlurKernelSize ?? 32;
  }
  return pipeline;
}
__name(parseDefaultRenderingPipeline, "parseDefaultRenderingPipeline");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/rendering/volumetric/pipeline.js
var import_babylonjs22 = require("babylonjs");
var import_babylonjs23 = require("babylonjs");
var import_babylonjs24 = require("babylonjs");
var import_babylonjs25 = require("babylonjs");
var import_babylonjs26 = require("babylonjs");
var import_babylonjs27 = require("babylonjs");
var import_babylonjs28 = require("babylonjs");
var import_babylonjs29 = require("babylonjs");
var import_babylonjs30 = require("babylonjs");
var import_babylonjs31 = require("babylonjs");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/rendering/volumetric/types.js
var volumetricLightMetadataKey = "volumetricLighting";
var maxVolumetricShadowSlots = 8;
var maxVolumetricArrayLights = 256;
var maxVolumetricDirectionalLights = 4;
var volumetricTemporalSamplesDivider = 3;
var VolumetricStepDistribution;
(function(VolumetricStepDistribution2) {
  VolumetricStepDistribution2[VolumetricStepDistribution2["Linear"] = 0] = "Linear";
  VolumetricStepDistribution2[VolumetricStepDistribution2["Exponential"] = 1] = "Exponential";
})(VolumetricStepDistribution || (VolumetricStepDistribution = {}));
var VolumetricDitherMode;
(function(VolumetricDitherMode2) {
  VolumetricDitherMode2[VolumetricDitherMode2["None"] = 0] = "None";
  VolumetricDitherMode2[VolumetricDitherMode2["Bayer"] = 1] = "Bayer";
  VolumetricDitherMode2[VolumetricDitherMode2["InterleavedGradientNoise"] = 2] = "InterleavedGradientNoise";
})(VolumetricDitherMode || (VolumetricDitherMode = {}));
var VolumetricFogMode;
(function(VolumetricFogMode2) {
  VolumetricFogMode2[VolumetricFogMode2["Exponential"] = 0] = "Exponential";
  VolumetricFogMode2[VolumetricFogMode2["ExponentialSquared"] = 1] = "ExponentialSquared";
  VolumetricFogMode2[VolumetricFogMode2["Linear"] = 2] = "Linear";
})(VolumetricFogMode || (VolumetricFogMode = {}));
var VolumetricDebugMode;
(function(VolumetricDebugMode2) {
  VolumetricDebugMode2[VolumetricDebugMode2["None"] = 0] = "None";
  VolumetricDebugMode2[VolumetricDebugMode2["Scattering"] = 1] = "Scattering";
  VolumetricDebugMode2[VolumetricDebugMode2["Transmittance"] = 2] = "Transmittance";
  VolumetricDebugMode2[VolumetricDebugMode2["LightCount"] = 3] = "LightCount";
})(VolumetricDebugMode || (VolumetricDebugMode = {}));
function getDefaultVolumetricLightConfiguration() {
  return {
    enabled: false,
    volumeIntensity: 1,
    anisotropy: 0.35,
    useCustomColor: false,
    color: [1, 1, 1],
    castVolumetricShadows: false,
    shadowDarkness: 1,
    rangeMultiplier: 1,
    priority: 0
  };
}
__name(getDefaultVolumetricLightConfiguration, "getDefaultVolumetricLightConfiguration");
function getDefaultVolumetricLightingConfiguration() {
  return {
    steps: 40,
    lightSteps: 0,
    resolutionScale: 0.5,
    stepDistribution: VolumetricStepDistribution.Exponential,
    ditherMode: VolumetricDitherMode.InterleavedGradientNoise,
    ditherStrength: 1,
    temporalJitter: false,
    temporalAccumulation: false,
    temporalAccumulationFactor: 0.1,
    fogMode: VolumetricFogMode.Exponential,
    fogDensity: 5e-4,
    fogStart: 0,
    fogEnd: 2e3,
    fogColor: [1, 1, 1],
    albedo: 1,
    maxDistance: 1e4,
    heightFogEnabled: false,
    heightFogBaseHeight: 0,
    heightFogFalloff: 0.01,
    intensity: 1.5,
    lightExtinctionEnabled: true,
    lightExtinctionClamp: 1e3,
    extinctionAmount: 0,
    ambientColor: [1, 1, 1],
    ambientIntensity: 0,
    screenSpaceShadows: true,
    screenSpaceShadowSteps: 6,
    screenSpaceShadowBias: 0.02,
    screenSpaceShadowMaxDistance: 2e3,
    screenSpaceShadowThickness: 4,
    blurPasses: 2,
    blurRadius: 3,
    blurDepthThreshold: 0.02,
    upsampleDepthThreshold: 0.02,
    maxLights: 128,
    maxShadowedLights: 4,
    pcfTaps: 4,
    selectionRefreshRate: 2,
    debugMode: VolumetricDebugMode.None
  };
}
__name(getDefaultVolumetricLightingConfiguration, "getDefaultVolumetricLightingConfiguration");
function getVolumetricLightSteps(configuration2) {
  if (configuration2.lightSteps > 0) {
    return configuration2.lightSteps;
  }
  return Math.max(4, Math.min(64, Math.round(configuration2.steps * 0.3)));
}
__name(getVolumetricLightSteps, "getVolumetricLightSteps");
function getVolumetricSamplingSteps(configuration2, temporalSamplesDivider = volumetricTemporalSamplesDivider) {
  const lightSteps = getVolumetricLightSteps(configuration2);
  if (!configuration2.temporalAccumulation || temporalSamplesDivider <= 1) {
    return { steps: configuration2.steps, lightSteps };
  }
  return {
    steps: Math.max(4, Math.ceil(configuration2.steps / temporalSamplesDivider)),
    lightSteps: Math.max(2, Math.ceil(lightSteps / temporalSamplesDivider))
  };
}
__name(getVolumetricSamplingSteps, "getVolumetricSamplingSteps");
function normalizeNumber(value, defaultValue, min, max) {
  const result = typeof value === "number" && isFinite(value) ? value : defaultValue;
  return Math.min(max, Math.max(min, result));
}
__name(normalizeNumber, "normalizeNumber");
function normalizeColor(value, defaultValue) {
  if (!Array.isArray(value) || value.length < 3) {
    return defaultValue.slice();
  }
  return [normalizeNumber(value[0], defaultValue[0], 0, 100), normalizeNumber(value[1], defaultValue[1], 0, 100), normalizeNumber(value[2], defaultValue[2], 0, 100)];
}
__name(normalizeColor, "normalizeColor");
function normalizeVolumetricLightConfiguration(data) {
  const defaults = getDefaultVolumetricLightConfiguration();
  if (!data || typeof data !== "object") {
    return defaults;
  }
  return {
    enabled: data.enabled ?? defaults.enabled,
    volumeIntensity: normalizeNumber(data.volumeIntensity, defaults.volumeIntensity, 0, 1e3),
    anisotropy: normalizeNumber(data.anisotropy, defaults.anisotropy, -0.95, 0.95),
    useCustomColor: data.useCustomColor ?? defaults.useCustomColor,
    color: normalizeColor(data.color, defaults.color),
    castVolumetricShadows: data.castVolumetricShadows ?? defaults.castVolumetricShadows,
    shadowDarkness: normalizeNumber(data.shadowDarkness, defaults.shadowDarkness, 0, 1),
    rangeMultiplier: normalizeNumber(data.rangeMultiplier, defaults.rangeMultiplier, 0, 100),
    priority: normalizeNumber(data.priority, defaults.priority, -1e3, 1e3)
  };
}
__name(normalizeVolumetricLightConfiguration, "normalizeVolumetricLightConfiguration");
function normalizeVolumetricLightingConfiguration(data) {
  const defaults = getDefaultVolumetricLightingConfiguration();
  if (!data || typeof data !== "object") {
    return defaults;
  }
  return {
    steps: Math.round(normalizeNumber(data.steps, defaults.steps, 4, 256)),
    lightSteps: Math.round(normalizeNumber(data.lightSteps, defaults.lightSteps, 0, 128)),
    resolutionScale: normalizeNumber(data.resolutionScale, defaults.resolutionScale, 0.1, 1),
    stepDistribution: Math.round(normalizeNumber(data.stepDistribution, defaults.stepDistribution, 0, 1)),
    ditherMode: Math.round(normalizeNumber(data.ditherMode, defaults.ditherMode, 0, 2)),
    ditherStrength: normalizeNumber(data.ditherStrength, defaults.ditherStrength, 0, 1),
    temporalJitter: data.temporalJitter ?? defaults.temporalJitter,
    temporalAccumulation: data.temporalAccumulation ?? defaults.temporalAccumulation,
    temporalAccumulationFactor: normalizeNumber(data.temporalAccumulationFactor, defaults.temporalAccumulationFactor, 5e-3, 1),
    fogMode: Math.round(normalizeNumber(data.fogMode, defaults.fogMode, 0, 2)),
    fogDensity: normalizeNumber(data.fogDensity, defaults.fogDensity, 0, 100),
    fogStart: normalizeNumber(data.fogStart, defaults.fogStart, 0, 1e6),
    // The linear mode divides by "fogEnd - fogStart" and its extinction has a pole at "fogEnd", so an end
    // at or before the start would make the medium either vanish or turn instantly opaque.
    fogEnd: Math.max(normalizeNumber(data.fogEnd, defaults.fogEnd, 0, 1e7), normalizeNumber(data.fogStart, defaults.fogStart, 0, 1e6) + 1e-3),
    fogColor: normalizeColor(data.fogColor, defaults.fogColor),
    albedo: normalizeNumber(data.albedo, defaults.albedo, 0, 1),
    maxDistance: normalizeNumber(data.maxDistance, defaults.maxDistance, 1, 1e6),
    heightFogEnabled: data.heightFogEnabled ?? defaults.heightFogEnabled,
    heightFogBaseHeight: normalizeNumber(data.heightFogBaseHeight, defaults.heightFogBaseHeight, -1e6, 1e6),
    heightFogFalloff: normalizeNumber(data.heightFogFalloff, defaults.heightFogFalloff, 0, 10),
    intensity: normalizeNumber(data.intensity, defaults.intensity, 0, 100),
    lightExtinctionEnabled: data.lightExtinctionEnabled ?? defaults.lightExtinctionEnabled,
    lightExtinctionClamp: normalizeNumber(data.lightExtinctionClamp, defaults.lightExtinctionClamp, 0, 1e6),
    extinctionAmount: normalizeNumber(data.extinctionAmount, defaults.extinctionAmount, 0, 1),
    ambientColor: normalizeColor(data.ambientColor, defaults.ambientColor),
    ambientIntensity: normalizeNumber(data.ambientIntensity, defaults.ambientIntensity, 0, 100),
    screenSpaceShadows: data.screenSpaceShadows ?? defaults.screenSpaceShadows,
    screenSpaceShadowSteps: Math.round(normalizeNumber(data.screenSpaceShadowSteps, defaults.screenSpaceShadowSteps, 1, 32)),
    screenSpaceShadowBias: normalizeNumber(data.screenSpaceShadowBias, defaults.screenSpaceShadowBias, 0, 1),
    screenSpaceShadowMaxDistance: normalizeNumber(data.screenSpaceShadowMaxDistance, defaults.screenSpaceShadowMaxDistance, 1, 1e7),
    screenSpaceShadowThickness: normalizeNumber(data.screenSpaceShadowThickness, defaults.screenSpaceShadowThickness, 0.01, 1e3),
    blurPasses: Math.round(normalizeNumber(data.blurPasses, defaults.blurPasses, 0, 2)),
    blurRadius: Math.round(normalizeNumber(data.blurRadius, defaults.blurRadius, 1, 6)),
    blurDepthThreshold: normalizeNumber(data.blurDepthThreshold, defaults.blurDepthThreshold, 1e-4, 1),
    upsampleDepthThreshold: normalizeNumber(data.upsampleDepthThreshold, defaults.upsampleDepthThreshold, 1e-4, 1),
    maxLights: Math.round(normalizeNumber(data.maxLights, defaults.maxLights, 0, maxVolumetricArrayLights)),
    maxShadowedLights: Math.round(normalizeNumber(data.maxShadowedLights, defaults.maxShadowedLights, 0, maxVolumetricShadowSlots)),
    pcfTaps: normalizeNumber(data.pcfTaps, defaults.pcfTaps, 1, 4) >= 4 ? 4 : 1,
    selectionRefreshRate: Math.round(normalizeNumber(data.selectionRefreshRate, defaults.selectionRefreshRate, 1, 60)),
    debugMode: Math.round(normalizeNumber(data.debugMode, defaults.debugMode, 0, 3))
  };
}
__name(normalizeVolumetricLightingConfiguration, "normalizeVolumetricLightingConfiguration");
var completedVolumetricLightConfigurations = /* @__PURE__ */ new WeakSet();
function ensureVolumetricLightConfiguration(light) {
  light.metadata ??= {};
  const existing = light.metadata[volumetricLightMetadataKey];
  if (!existing || typeof existing !== "object") {
    light.metadata[volumetricLightMetadataKey] = normalizeVolumetricLightConfiguration(null);
    completedVolumetricLightConfigurations.add(light.metadata[volumetricLightMetadataKey]);
    return light.metadata[volumetricLightMetadataKey];
  }
  if (completedVolumetricLightConfigurations.has(existing)) {
    return existing;
  }
  const defaults = getDefaultVolumetricLightConfiguration();
  Object.keys(defaults).forEach((key) => {
    if (existing[key] === void 0) {
      existing[key] = defaults[key];
    }
  });
  completedVolumetricLightConfigurations.add(existing);
  return existing;
}
__name(ensureVolumetricLightConfiguration, "ensureVolumetricLightConfiguration");
function getVolumetricLightConfiguration(light) {
  const data = light.metadata?.[volumetricLightMetadataKey];
  return data && typeof data === "object" ? ensureVolumetricLightConfiguration(light) : null;
}
__name(getVolumetricLightConfiguration, "getVolumetricLightConfiguration");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/rendering/volumetric/selector.js
var import_babylonjs15 = require("babylonjs");
var import_babylonjs16 = require("babylonjs");
var import_babylonjs17 = require("babylonjs");
var import_babylonjs18 = require("babylonjs");
var VolumetricShadowKind;
(function(VolumetricShadowKind2) {
  VolumetricShadowKind2[VolumetricShadowKind2["Texture2D"] = 0] = "Texture2D";
  VolumetricShadowKind2[VolumetricShadowKind2["Sampler2DShadow"] = 1] = "Sampler2DShadow";
  VolumetricShadowKind2[VolumetricShadowKind2["Cube"] = 2] = "Cube";
})(VolumetricShadowKind || (VolumetricShadowKind = {}));
var VolumetricShadowMode;
(function(VolumetricShadowMode2) {
  VolumetricShadowMode2[VolumetricShadowMode2["Standard"] = 0] = "Standard";
  VolumetricShadowMode2[VolumetricShadowMode2["Esm"] = 1] = "Esm";
  VolumetricShadowMode2[VolumetricShadowMode2["CloseEsm"] = 2] = "CloseEsm";
})(VolumetricShadowMode || (VolumetricShadowMode = {}));
var VolumetricTransmittanceMode;
(function(VolumetricTransmittanceMode2) {
  VolumetricTransmittanceMode2[VolumetricTransmittanceMode2["Analytic"] = 0] = "Analytic";
  VolumetricTransmittanceMode2[VolumetricTransmittanceMode2["AnalyticHeight"] = 1] = "AnalyticHeight";
  VolumetricTransmittanceMode2[VolumetricTransmittanceMode2["Numeric"] = 2] = "Numeric";
})(VolumetricTransmittanceMode || (VolumetricTransmittanceMode = {}));
var shadowedLightVectorCost = 10;
var arrayLightVectorCost = 4;
var csmVectorCost = 6 + 4 * 4;
var fixedVectorCost = 32;
var volumetricSlotHysteresis = 0.15;
function computeVolumetricBudget(engine, configuration2) {
  const caps = engine.getCaps();
  const reportedVectors = caps.maxFragmentUniformVectors || 224;
  const availableVectors = engine.isWebGPU ? Math.floor(reportedVectors / 4) : reportedVectors;
  const vectorBudget = Math.max(224, availableVectors) - fixedVectorCost;
  const samplerBudget = Math.max(8, caps.maxTexturesImageUnits || 16) - 1;
  const allowCsm = samplerBudget >= 2;
  const csmCost = allowCsm ? csmVectorCost : 0;
  const maxShadowSlots = Math.max(0, Math.min(maxVolumetricShadowSlots, configuration2.maxShadowedLights, samplerBudget - (allowCsm ? 1 : 0), Math.floor((vectorBudget - csmCost) / shadowedLightVectorCost)));
  const maxArrayLights = Math.max(0, Math.min(maxVolumetricArrayLights, configuration2.maxLights, Math.floor((vectorBudget - csmCost - maxShadowSlots * shadowedLightVectorCost) / arrayLightVectorCost)));
  return {
    maxShadowSlots,
    maxArrayLights,
    maxDirectionalLights: Math.min(maxVolumetricDirectionalLights, maxArrayLights),
    allowCsm
  };
}
__name(computeVolumetricBudget, "computeVolumetricBudget");
function getAllVolumetricCandidateLights(scene) {
  const result = [];
  scene.lights.forEach((light) => {
    if (isClusteredLightContainer(light)) {
      light.lights.forEach((clusteredLight) => {
        result.push({ light: clusteredLight, isClustered: true });
      });
    } else {
      result.push({ light, isClustered: false });
    }
  });
  return result;
}
__name(getAllVolumetricCandidateLights, "getAllVolumetricCandidateLights");
function resolveVolumetricShadowSlot(light, scene) {
  const generator = light.getShadowGenerator(scene.activeCamera) ?? light.getShadowGenerator();
  if (!generator || !isShadowGenerator(generator)) {
    return null;
  }
  const shadowMap = generator.getShadowMapForRendering();
  if (!shadowMap?.isReady()) {
    return null;
  }
  const mapSize = generator.getShadowMap()?.getSize().width ?? 1024;
  const packed = shadowMap.textureType === import_babylonjs17.Constants.TEXTURETYPE_UNSIGNED_BYTE;
  const local = !isDirectionalLight(light);
  const isCube = light.needCube?.() === true;
  switch (generator.filter) {
    case import_babylonjs18.ShadowGenerator.FILTER_PCF:
    case import_babylonjs18.ShadowGenerator.FILTER_PCSS:
      return {
        generator,
        kind: isCube ? VolumetricShadowKind.Cube : VolumetricShadowKind.Sampler2DShadow,
        mode: VolumetricShadowMode.Standard,
        packed,
        mapSize,
        local
      };
    case import_babylonjs18.ShadowGenerator.FILTER_EXPONENTIALSHADOWMAP:
    case import_babylonjs18.ShadowGenerator.FILTER_BLUREXPONENTIALSHADOWMAP:
      return { generator, kind: isCube ? VolumetricShadowKind.Cube : VolumetricShadowKind.Texture2D, mode: VolumetricShadowMode.Esm, packed, mapSize, local };
    case import_babylonjs18.ShadowGenerator.FILTER_CLOSEEXPONENTIALSHADOWMAP:
    case import_babylonjs18.ShadowGenerator.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP:
      return { generator, kind: isCube ? VolumetricShadowKind.Cube : VolumetricShadowKind.Texture2D, mode: VolumetricShadowMode.CloseEsm, packed, mapSize, local };
    default:
      return { generator, kind: isCube ? VolumetricShadowKind.Cube : VolumetricShadowKind.Texture2D, mode: VolumetricShadowMode.Standard, packed, mapSize, local };
  }
}
__name(resolveVolumetricShadowSlot, "resolveVolumetricShadowSlot");
function getVolumetricLightWorldPosition(light, result) {
  const anyLight = light;
  if (anyLight.computeTransformedInformation?.() && anyLight.transformedPosition) {
    result.copyFrom(anyLight.transformedPosition);
  } else if (anyLight.position) {
    result.copyFrom(anyLight.position);
  } else {
    result.copyFromFloats(0, 0, 0);
  }
  return result;
}
__name(getVolumetricLightWorldPosition, "getVolumetricLightWorldPosition");
function getVolumetricLightWorldDirection(light, result) {
  const anyLight = light;
  if (anyLight.computeTransformedInformation?.() && anyLight.transformedDirection) {
    result.copyFrom(anyLight.transformedDirection);
  } else if (anyLight.direction) {
    result.copyFrom(anyLight.direction);
  } else {
    result.copyFromFloats(0, 0, 1);
  }
  return result.normalize();
}
__name(getVolumetricLightWorldDirection, "getVolumetricLightWorldDirection");
function getVolumetricLightRange(light, config, configuration2) {
  const range = light.range > 0 && light.range < Number.MAX_VALUE ? light.range : configuration2.maxDistance;
  return Math.max(1e-3, Math.min(range * config.rangeMultiplier, 34e37));
}
__name(getVolumetricLightRange, "getVolumetricLightRange");
var temporaryPosition = new import_babylonjs15.Vector3();
var temporaryDirection = new import_babylonjs15.Vector3();
function computeVolumetricLightBounds(light, range, center) {
  getVolumetricLightWorldPosition(light, center);
  if (!isSpotLight(light)) {
    return range;
  }
  const cosHalfAngle = Math.cos(light.angle * 0.5);
  if (cosHalfAngle <= 0.5) {
    return range;
  }
  const radius = range / (2 * cosHalfAngle);
  getVolumetricLightWorldDirection(light, temporaryDirection);
  center.addInPlace(temporaryDirection.scaleInPlace(radius));
  return radius;
}
__name(computeVolumetricLightBounds, "computeVolumetricLightBounds");
function isSphereInFrustum(center, radius, planes) {
  for (let i = 0; i < planes.length; ++i) {
    if (planes[i].dotCoordinate(center) <= -radius) {
      return false;
    }
  }
  return true;
}
__name(isSphereInFrustum, "isSphereInFrustum");
function getShadowSlotSignature(shadow) {
  return (shadow.local ? 64 : 0) + shadow.kind * 16 + shadow.mode * 4 + (shadow.packed ? 1 : 0);
}
__name(getShadowSlotSignature, "getShadowSlotSignature");
function selectVolumetricLights(scene, camera, configuration2, budget, previous) {
  const stats = {
    candidateCount: 0,
    culledCount: 0,
    shadowedCount: 0,
    unshadowedCount: 0,
    droppedCount: 0,
    perLight: /* @__PURE__ */ new Map()
  };
  const frustumPlanes = import_babylonjs16.Frustum.GetPlanes(scene.getTransformMatrix());
  const cameraPosition = camera.globalPosition;
  const candidates = [];
  getAllVolumetricCandidateLights(scene).forEach(({ light, isClustered }) => {
    const config = getVolumetricLightConfiguration(light);
    if (!config?.enabled) {
      return;
    }
    stats.candidateCount++;
    if (isHemisphericLight(light) || !light.isEnabled() || light.intensity <= 0 || config.volumeIntensity <= 0) {
      stats.perLight.set(light.uniqueId, {
        state: "disabled",
        slot: -1,
        reason: isHemisphericLight(light) ? "Hemispheric lights have no position nor direction and can't produce light shafts." : "The light is disabled or its intensity is zero."
      });
      return;
    }
    const isDirectional = isDirectionalLight(light);
    let score = config.priority * 1e3;
    if (isDirectional) {
      score += 1e6;
    } else {
      const range = Math.min(getVolumetricLightRange(light, config, configuration2), configuration2.maxDistance);
      const radius = computeVolumetricLightBounds(light, range, temporaryPosition);
      if (!isSphereInFrustum(temporaryPosition, radius, frustumPlanes)) {
        stats.culledCount++;
        stats.perLight.set(light.uniqueId, {
          state: "culled",
          slot: -1,
          reason: "The light is outside of the frustum of the camera and doesn't reach it."
        });
        return;
      }
      const distance = Math.max(1, import_babylonjs15.Vector3.Distance(temporaryPosition, cameraPosition) - radius);
      score += config.volumeIntensity * light.intensity * Math.min(4, radius / distance);
    }
    candidates.push({
      light,
      config,
      isClustered,
      typeId: light.getTypeID(),
      score
    });
  });
  candidates.sort((a, b) => b.score - a.score);
  const previousSlots = /* @__PURE__ */ new Map();
  previous?.shadowed.forEach((entry, index) => {
    previousSlots.set(entry.candidate.light.uniqueId, index);
  });
  const shadowedCandidates = [];
  const unshadowedCandidates = [];
  const unshadowedReasons = /* @__PURE__ */ new Map();
  let csm = null;
  candidates.forEach((candidate) => {
    const { light, config } = candidate;
    if (!config.castVolumetricShadows) {
      unshadowedReasons.set(light.uniqueId, "occlusion is disabled on this light.");
      unshadowedCandidates.push(candidate);
      return;
    }
    if (candidate.isClustered) {
      unshadowedReasons.set(light.uniqueId, "clustered lighting doesn't support shadow maps.");
      unshadowedCandidates.push(candidate);
      return;
    }
    if (!light.shadowEnabled || !scene.shadowsEnabled) {
      unshadowedReasons.set(light.uniqueId, "shadows are disabled on this light or on the scene.");
      unshadowedCandidates.push(candidate);
      return;
    }
    const generator = light.getShadowGenerator(scene.activeCamera) ?? light.getShadowGenerator();
    if (!generator) {
      unshadowedReasons.set(light.uniqueId, "the light has no shadow generator.");
      unshadowedCandidates.push(candidate);
      return;
    }
    if (isCascadedShadowGenerator(generator) && budget.allowCsm) {
      const shadowMap = generator.getShadowMapForRendering();
      if (!csm && shadowMap?.isReady()) {
        csm = {
          candidate,
          generator,
          cascades: generator.numCascades,
          kind: generator.filter === import_babylonjs18.ShadowGenerator.FILTER_PCF || generator.filter === import_babylonjs18.ShadowGenerator.FILTER_PCSS ? VolumetricShadowKind.Sampler2DShadow : VolumetricShadowKind.Texture2D,
          packed: shadowMap.textureType === import_babylonjs17.Constants.TEXTURETYPE_UNSIGNED_BYTE
        };
        return;
      }
      unshadowedReasons.set(light.uniqueId, csm ? "another light already uses the single cascaded shadow map slot." : "its cascaded shadow map is not ready yet.");
      unshadowedCandidates.push(candidate);
      return;
    }
    const shadow = resolveVolumetricShadowSlot(light, scene);
    if (!shadow) {
      unshadowedReasons.set(light.uniqueId, "the shadow map of the light is not ready yet.");
      unshadowedCandidates.push(candidate);
      return;
    }
    shadowedCandidates.push({ candidate, shadow });
  });
  function getHysteresisScore(entry) {
    const score = entry.candidate.score;
    if (previousSlots.get(entry.candidate.light.uniqueId) === void 0) {
      return score;
    }
    return score + Math.abs(score) * volumetricSlotHysteresis;
  }
  __name(getHysteresisScore, "getHysteresisScore");
  function getPreviousSlot(entry) {
    return previousSlots.get(entry.candidate.light.uniqueId) ?? Number.MAX_SAFE_INTEGER;
  }
  __name(getPreviousSlot, "getPreviousSlot");
  shadowedCandidates.sort((a, b) => {
    const difference = getHysteresisScore(b) - getHysteresisScore(a);
    if (difference !== 0) {
      return difference;
    }
    return getPreviousSlot(a) - getPreviousSlot(b);
  });
  const shadowed = shadowedCandidates.slice(0, budget.maxShadowSlots);
  shadowed.sort((a, b) => getShadowSlotSignature(a.shadow) - getShadowSlotSignature(b.shadow) || getPreviousSlot(a) - getPreviousSlot(b));
  shadowedCandidates.slice(budget.maxShadowSlots).forEach((entry) => {
    unshadowedReasons.set(entry.candidate.light.uniqueId, "the shadowed lights budget is full.");
    unshadowedCandidates.push(entry.candidate);
  });
  unshadowedCandidates.sort((a, b) => b.score - a.score);
  const directional = [];
  const local = [];
  const dropped = [];
  unshadowedCandidates.forEach((candidate) => {
    if (isDirectionalLight(candidate.light)) {
      if (directional.length < budget.maxDirectionalLights) {
        directional.push(candidate);
      } else {
        dropped.push({
          candidate,
          reason: `Not rendered: at most ${budget.maxDirectionalLights} directional light(s) without a shadow map can take part in the effect.`
        });
      }
    } else {
      local.push(candidate);
    }
  });
  const localCapacity = Math.max(0, budget.maxArrayLights - directional.length);
  local.slice(localCapacity).forEach((candidate) => {
    dropped.push({
      candidate,
      reason: 'Not rendered: the lights budget is full. Raise "Max Lights" or lower the priority of the other lights.'
    });
  });
  const unshadowed = directional.concat(local.slice(0, localCapacity));
  shadowed.forEach((entry, index) => {
    stats.shadowedCount++;
    stats.perLight.set(entry.candidate.light.uniqueId, {
      state: "shadowed",
      slot: index,
      reason: `Casting volumetric shadows using slot ${index + 1} of ${budget.maxShadowSlots}.`
    });
  });
  if (csm) {
    const csmSelection = csm;
    stats.shadowedCount++;
    stats.perLight.set(csmSelection.candidate.light.uniqueId, {
      state: "shadowed",
      slot: -1,
      reason: `Casting volumetric shadows using its ${csmSelection.cascades} shadow cascades.`
    });
  }
  unshadowed.forEach((candidate) => {
    stats.unshadowedCount++;
    const occluded = candidate.config.castVolumetricShadows ? "Occluded using the depth buffer" : "Not occluded by the geometry";
    const reason = unshadowedReasons.get(candidate.light.uniqueId) ?? "the light has no shadow map.";
    stats.perLight.set(candidate.light.uniqueId, { state: "unshadowed", slot: -1, reason: `${occluded}: ${reason}` });
  });
  dropped.forEach(({ candidate, reason }) => {
    stats.droppedCount++;
    stats.perLight.set(candidate.light.uniqueId, { state: "dropped", slot: -1, reason });
  });
  return { shadowed, unshadowed, directionalCount: directional.length, csm, stats };
}
__name(selectVolumetricLights, "selectVolumetricLights");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/rendering/volumetric/depth.js
var import_babylonjs19 = require("babylonjs");
var geometryBufferDepthTextureType = 0;
var VolumetricDepthSource;
(function(VolumetricDepthSource2) {
  VolumetricDepthSource2[VolumetricDepthSource2["DepthRenderer"] = 0] = "DepthRenderer";
  VolumetricDepthSource2[VolumetricDepthSource2["GeometryBuffer"] = 1] = "GeometryBuffer";
  VolumetricDepthSource2[VolumetricDepthSource2["PrePass"] = 2] = "PrePass";
})(VolumetricDepthSource || (VolumetricDepthSource = {}));
var volumetricLightingPrePassConfigurationName = "volumetricLighting";
function createVolumetricLightingPrePassConfiguration() {
  return {
    name: volumetricLightingPrePassConfigurationName,
    enabled: false,
    texturesRequired: [import_babylonjs19.Constants.PREPASS_DEPTH_TEXTURE_TYPE]
  };
}
__name(createVolumetricLightingPrePassConfiguration, "createVolumetricLightingPrePassConfiguration");
function getVolumetricPrePassRenderer(scene) {
  return scene.prePassRenderer ?? null;
}
__name(getVolumetricPrePassRenderer, "getVolumetricPrePassRenderer");
function getVolumetricGeometryBufferRenderer(scene) {
  return scene.geometryBufferRenderer ?? null;
}
__name(getVolumetricGeometryBufferRenderer, "getVolumetricGeometryBufferRenderer");
function supportsVolumetricFloatDepthTexture(engine) {
  const caps = engine.getCaps();
  return caps.textureFloat && caps.textureFloatLinearFiltering || caps.textureHalfFloat && caps.textureHalfFloatLinearFiltering;
}
__name(supportsVolumetricFloatDepthTexture, "supportsVolumetricFloatDepthTexture");
function resolveVolumetricDepthSource(scene) {
  if (!supportsVolumetricFloatDepthTexture(scene.getEngine())) {
    return VolumetricDepthSource.DepthRenderer;
  }
  if (getVolumetricPrePassRenderer(scene)?.isSupported) {
    return VolumetricDepthSource.PrePass;
  }
  if (getVolumetricGeometryBufferRenderer(scene)?.isSupported) {
    return VolumetricDepthSource.GeometryBuffer;
  }
  return VolumetricDepthSource.DepthRenderer;
}
__name(resolveVolumetricDepthSource, "resolveVolumetricDepthSource");
function getVolumetricPrePassDepthTexture(prePassRenderer) {
  const index = prePassRenderer.getIndex(import_babylonjs19.Constants.PREPASS_DEPTH_TEXTURE_TYPE);
  if (index === void 0 || index < 0) {
    return null;
  }
  return prePassRenderer.getRenderTarget()?.textures?.[index] ?? null;
}
__name(getVolumetricPrePassDepthTexture, "getVolumetricPrePassDepthTexture");
function getVolumetricGeometryBufferDepthTexture(geometryBufferRenderer) {
  if (!geometryBufferRenderer.enableDepth) {
    return null;
  }
  const index = geometryBufferRenderer.getTextureIndex(geometryBufferDepthTextureType);
  if (index < 0) {
    return null;
  }
  return geometryBufferRenderer.getGBuffer()?.textures?.[index] ?? null;
}
__name(getVolumetricGeometryBufferDepthTexture, "getVolumetricGeometryBufferDepthTexture");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/rendering/volumetric/shaders.js
var import_babylonjs20 = require("babylonjs");
var import_babylonjs21 = require("babylonjs");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/rendering/volumetric/shaders-wgsl.js
var packingHelpers = (
  /* wgsl */
  `
// Stored scaled down by a power of two, which is exact. @see the GLSL version.
const volLinearDepthScale: f32 = 1.0 / 1024.0;

fn volUnpack(color: vec4f) -> f32 {
	let bitShift = vec4f(1.0 / (255.0 * 255.0 * 255.0), 1.0 / (255.0 * 255.0), 1.0 / 255.0, 1.0);
	return dot(color, bitShift);
}
`
);
var depthMapHelpers = (
  /* wgsl */
  `
// Loads the texel under the given coordinates rather than filtering: the 32 bits float textures of the prepass
// renderer are not filterable on WebGPU. @see the GLSL version.
fn volSampleDepth(uv: vec2f) -> f32 {
	let size = vec2i(textureDimensions(depthSampler));
	let coordinates = min(vec2i(uv * vec2f(size)), size - 1);

	#ifdef VOL_DEPTH_PACKED
		return volUnpack(textureLoad(depthSampler, coordinates, 0));
	#else
		return textureLoad(depthSampler, coordinates, 0).r;
	#endif
}

// Converts the raw value stored in the depth map into a distance along the view axis, in scene units.
fn volLinearDepth(d: f32) -> f32 {
	#ifdef VOL_DEPTH_VIEWZ
		// The view space Z is stored directly, negative in a right handed scene. The sky is cleared to 0.
		let viewZ = abs(d);
		return select(viewZ, uniforms.volCameraMinMaxZ.y, viewZ <= 0.0);
	#else
		// The depth renderer stores "(clipZ + minZ) / (minZ + maxZ)", which is affine in the view space Z
		// for both the perspective and the orthographic projections. "volDepthUnpack" holds the two
		// coefficients of the exact inverse, computed on the CPU from the projection matrix of the scene.
		return uniforms.volDepthUnpack.x * d + uniforms.volDepthUnpack.y;
	#endif
}
`
);
function buildLinearDepthHelpers(texture) {
  return (
    /* wgsl */
    `
// Returns the distance along the view axis, in scene units, of the texel at the given coordinates.
fn volReadLinearDepth(coordinates: vec2i) -> f32 {
	#ifdef VOL_LINEAR_DEPTH_PACKED
		return volUnpack(textureLoad(${texture}, coordinates, 0)) * uniforms.volCameraMinMaxZ.y;
	#else
		return textureLoad(${texture}, coordinates, 0).r * (1.0 / volLinearDepthScale);
	#endif
}

// Returns the texel of the linear depth under the center of the given texel of the scattering buffer.
// @see the GLSL version.
fn volScatterToDepthTexel(scatterTexel: vec2i, depthSize: vec2i) -> vec2i {
	return min(vec2i((vec2f(scatterTexel) + 0.5) * uniforms.volDepthRatio), depthSize - 1);
}
`
  );
}
__name(buildLinearDepthHelpers, "buildLinearDepthHelpers");
function buildVolumetricLightingLinearDepthShaderWGSL() {
  return (
    /* wgsl */
    `
varying vUV: vec2f;

var textureSamplerSampler: sampler;
var textureSampler: texture_2d<f32>;
var depthSampler: texture_2d<f32>;

uniform volCameraMinMaxZ: vec2f;
uniform volDepthUnpack: vec2f;

// (1 when the pipeline has nothing to draw this frame, unused, unused, unused)
uniform volPassParams: vec4f;

${packingHelpers}
${depthMapHelpers}

fn volPack(depth: f32) -> vec4f {
	let bitShift = vec4f(255.0 * 255.0 * 255.0, 255.0 * 255.0, 255.0, 1.0);
	let bitMask = vec4f(0.0, 1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0);

	var result = fract(depth * bitShift);
	result -= result.xxyz * bitMask;

	return result;
}

@fragment
fn main(input: FragmentInputs) -> FragmentOutputs {
	// Nothing reads the linear depth while the pipeline has nothing to draw.
	if (uniforms.volPassParams.x > 0.5) {
		fragmentOutputs.color = vec4f(0.0);
	} else {
		let viewZ = volLinearDepth(volSampleDepth(input.vUV));

		#ifdef VOL_LINEAR_DEPTH_PACKED
			fragmentOutputs.color = volPack(clamp(viewZ / uniforms.volCameraMinMaxZ.y, 0.0, 0.9999999));
		#else
			// Bounded by the largest 16 bits float.
			fragmentOutputs.color = vec4f(min(viewZ * volLinearDepthScale, 65504.0), 0.0, 0.0, 1.0);
		#endif
	}
}
`
  );
}
__name(buildVolumetricLightingLinearDepthShaderWGSL, "buildVolumetricLightingLinearDepthShaderWGSL");
function buildLocalLightIntegrationWGSL(seed, occlusion) {
  return (
    /* wgsl */
    `
		let chordLength = t1 - t0;

		// The point of the view ray closest to the light splits the chord in two halves over which both the
		// attenuation and the phase function are monotonic, which is where stratified samples do best.
		var closest = clamp(dot(data.xyz, volRayDir), t0, t1);
		if (closest - t0 < 0.02 * chordLength) {
			closest = t0;
		} else if (t1 - closest < 0.02 * chordLength) {
			closest = t1;
		}

		let count = volLocalSampleCount(chordLength, falloff.x, tEnd - tStart);

		var firstCount = clamp(i32(f32(count) * (closest - t0) / chordLength + 0.5), 1, count - 1);
		if (closest <= t0) {
			firstCount = 0;
		} else if (closest >= t1) {
			firstCount = count;
		}

		let firstWidth = (closest - t0) / f32(max(firstCount, 1));
		let secondWidth = (t1 - closest) / f32(max(count - firstCount, 1));
		let stratum = volStratumOffset(${seed});

		var result = vec3f(0.0);

		for (var k: i32 = 0; k < VOL_LOCAL_MAX_STEPS; k++) {
			if (k >= count) {
				break;
			}

			let inFirstHalf = k < firstCount;
			let width = select(secondWidth, firstWidth, inFirstHalf);
			let t = select(closest + width * (f32(k - firstCount) + stratum), t0 + width * (f32(k) + stratum), inFirstHalf);

			let position = volRayDir * t;
			let sigmaT = volExtinctionAt(uniforms.volCameraPosition.y + position.y, t);

			let lightSample = volEvalLocalLight(data, diffuse, direction, falloff, position);
			var contribution = lightSample.xyz;
			let distanceToLight = lightSample.w;

			if (contribution.r + contribution.g + contribution.b > 0.0) {
				${occlusion}
				result += contribution * (volCombinedTransmittance(t, sigmaT, distanceToLight) * sigmaT * width);
			}
		}

		return vec4f(result, 1.0);
`
  );
}
__name(buildLocalLightIntegrationWGSL, "buildLocalLightIntegrationWGSL");
function buildVolumetricLightingScatteringShaderWGSL(shadowSlotCount) {
  const slots = [];
  const globalSlotContributions = [];
  const localSlotContributions = [];
  for (let i = 0; i < shadowSlotCount; ++i) {
    slots.push(
      /* wgsl */
      `
#if VOL_SHADOW_SLOT_COUNT > {X}
	#if VOL_SHADOW_KIND{X} == 2
		var volShadowSampler{X}Sampler: sampler;
		var volShadowSampler{X}: texture_cube<f32>;
	#elif VOL_SHADOW_KIND{X} == 1
		var volShadowSampler{X}Sampler: sampler_comparison;
		var volShadowSampler{X}: texture_depth_2d;
	#else
		var volShadowSampler{X}Sampler: sampler;
		var volShadowSampler{X}: texture_2d<f32>;
	#endif

	// Returns the shadowing of a point given its position relative to the camera and, for the 2d shadow maps, its
	// position in the clip space of the light. @see the GLSL version.
	fn volShadow{X}(position: vec3f, clip: vec4f) -> f32 {
		let info = uniforms.volShadowInfo[{X}];
		let edge = uniforms.volShadowLightFalloff[{X}].z;

		#if VOL_SHADOW_KIND{X} == 2
			// Cube shadow map of a point light. It stores the radial distance to the light.
			var toFragment = position - uniforms.volShadowLightData[{X}].xyz;
			let depth = clamp((length(toFragment) + info.z) / info.w, 0.0, 1.0);

			toFragment = normalize(toFragment);
			toFragment.y = -toFragment.y;

			#ifdef VOL_SHADOW_PACKED{X}
				let shadowMapSample = volUnpack(textureSampleLevel(volShadowSampler{X}, volShadowSampler{X}Sampler, toFragment, 0.0));
			#else
				let shadowMapSample = textureSampleLevel(volShadowSampler{X}, volShadowSampler{X}Sampler, toFragment, 0.0).x;
			#endif

			#if VOL_SHADOW_MODE{X} == 1
				// Exponential shadow map, same encoding as the 2d case. "info.y" holds the depth scale.
				return 1.0 - clamp(exp(min(87.0, info.y * depth)) * shadowMapSample, 0.0, 1.0 - info.x);
			#elif VOL_SHADOW_MODE{X} == 2
				return clamp(exp(min(87.0, -info.y * (depth - shadowMapSample))), info.x, 1.0);
			#else
				return select(1.0, info.x, depth > shadowMapSample);
			#endif
		#else
			let clipSpace = clip.xyz / clip.w;

			// "getTransformMatrix" gives the world to light clip space matrix without the [-1, 1] -> [0, 1] bias.
			#if VOL_SHADOW_KIND{X} == 1
				var uvDepth = 0.5 * clipSpace + vec3f(0.5);
				#ifdef VOL_NDC_HALF_Z
					uvDepth.z = clipSpace.z;
				#endif

				// Same guard as "computeShadowWithPCF1": past the far plane of the shadow map the hardware
				// comparison would fail against every texel a caster wrote, reporting the sample as occluded
				// while the surfaces at the same distance are lit by the material path.
				let pcfDepthMetric = volDepthMetric(clip, info.zw);
				if (pcfDepthMetric < 0.0 || pcfDepthMetric > 1.0 || uvDepth.x < 0.0 || uvDepth.x > 1.0 || uvDepth.y < 0.0 || uvDepth.y > 1.0) {
					return 1.0;
				}

				// Hardware comparison sampling. "info.y" holds the inverse of the size of the shadow map.
				#if VOL_PCF_TAPS == 4
					let shadow = 0.25 * (
						textureSampleCompareLevel(volShadowSampler{X}, volShadowSampler{X}Sampler, uvDepth.xy + vec2f(-0.5 * info.y, -0.5 * info.y), uvDepth.z) +
						textureSampleCompareLevel(volShadowSampler{X}, volShadowSampler{X}Sampler, uvDepth.xy + vec2f( 0.5 * info.y, -0.5 * info.y), uvDepth.z) +
						textureSampleCompareLevel(volShadowSampler{X}, volShadowSampler{X}Sampler, uvDepth.xy + vec2f(-0.5 * info.y,  0.5 * info.y), uvDepth.z) +
						textureSampleCompareLevel(volShadowSampler{X}, volShadowSampler{X}Sampler, uvDepth.xy + vec2f( 0.5 * info.y,  0.5 * info.y), uvDepth.z)
					);
				#else
					let shadow = textureSampleCompareLevel(volShadowSampler{X}, volShadowSampler{X}Sampler, uvDepth.xy, uvDepth.z);
				#endif

				return volFallOff(mix(info.x, 1.0, shadow), clipSpace.xy, edge);
			#else
				let uv = 0.5 * clipSpace.xy + vec2f(0.5);
				if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
					return 1.0;
				}

				let depthMetric = clamp(volDepthMetric(clip, info.zw), 0.0, 1.0);

				#ifdef VOL_SHADOW_PACKED{X}
					let shadowMapSample = volUnpack(textureSampleLevel(volShadowSampler{X}, volShadowSampler{X}Sampler, uv, 0.0));
				#else
					let shadowMapSample = textureSampleLevel(volShadowSampler{X}, volShadowSampler{X}Sampler, uv, 0.0).x;
				#endif

				#if VOL_SHADOW_MODE{X} == 1
					// Exponential shadow map. "info.y" holds the depth scale of the generator.
					return volFallOff(1.0 - clamp(exp(min(87.0, info.y * depthMetric)) * shadowMapSample, 0.0, 1.0 - info.x), clipSpace.xy, edge);
				#elif VOL_SHADOW_MODE{X} == 2
					// Close exponential shadow map.
					return volFallOff(clamp(exp(min(87.0, -info.y * (depthMetric - shadowMapSample))), info.x, 1.0), clipSpace.xy, edge);
				#else
					return select(1.0, volFallOff(info.x, clipSpace.xy, edge), depthMetric > shadowMapSample);
				#endif
			#endif
		#endif
	}

	#if VOL_SHADOW_LOCAL{X} == 1
		// Point or spot light casting volumetric shadows: integrated over its own volume, like the others.
		fn volIntegrateShadowSlot{X}(tStart: f32, tEnd: f32) -> vec4f {
			let data = uniforms.volShadowLightData[{X}];
			let direction = uniforms.volShadowLightDirection[{X}];
			let falloff = uniforms.volShadowLightFalloff[{X}];

			let chord = volLightChord(data, direction, falloff.x);
			let t0 = max(chord.x, tStart);
			let t1 = min(chord.y, tEnd);

			if (t1 <= t0) {
				return vec4f(0.0);
			}

			let diffuse = uniforms.volShadowLightDiffuse[{X}];

			// The light clip space position of the points of the view ray is affine in their distance to the camera.
			let clipOrigin = uniforms.volShadowMatrix[{X}] * vec4f(uniforms.volCameraPosition, 1.0);
			let clipDirection = uniforms.volShadowMatrix[{X}] * vec4f(volRayDir, 0.0);
			${buildLocalLightIntegrationWGSL("f32({X}) + 0.5", "contribution *= mix(1.0, volShadow{X}(position, clipOrigin + clipDirection * t), falloff.w);")}
		}
	#endif
#endif
`.replace(/\{X\}/g, i.toString())
    );
    globalSlotContributions.push(
      /* wgsl */
      `
				#if VOL_SHADOW_SLOT_COUNT > {X}
					#if VOL_SHADOW_LOCAL{X} == 0
					{
						// Recomputed rather than kept affine to keep fewer registers alive across the march. @see the GLSL version.
						let shadow = volShadow{X}(position, uniforms.volShadowMatrix[{X}] * vec4f(uniforms.volCameraPosition + position, 1.0));
						scattering += volEvalDirectionalLight(uniforms.volShadowLightData[{X}], uniforms.volShadowLightDiffuse[{X}]) * mix(1.0, shadow, uniforms.volShadowLightFalloff[{X}].w);
						stepLights += 1.0;
					}
					#endif
				#endif
`.replace(/\{X\}/g, i.toString())
    );
    localSlotContributions.push(
      /* wgsl */
      `
		#if VOL_SHADOW_SLOT_COUNT > {X}
			#if VOL_SHADOW_LOCAL{X} == 1
				lightResult = volIntegrateShadowSlot{X}(tStart, tEnd);
				accumulated += lightResult.xyz;
				evaluatedLights += lightResult.w;
			#endif
		#endif
`.replace(/\{X\}/g, i.toString())
    );
  }
  return (
    /* wgsl */
    `
varying vUV: vec2f;

// Full resolution linear depth of the scene, written by the linear depth pass.
var textureSampler: texture_2d<f32>;

// Ratio between the resolution of the linear depth and the resolution of the scattering buffer.
uniform volDepthRatio: vec2f;

uniform volInverseViewProjection: mat4x4f;
uniform volCameraPosition: vec3f;
uniform volCameraForward: vec3f;
uniform volCameraMinMaxZ: vec2f;
uniform volFrameIndex: f32;

// Offset of the current frame along the golden ratio sequence the samples walk with the temporal accumulation.
uniform volTemporalOffset: f32;

uniform volFogInfos: vec4f;
uniform volFogColor: vec3f;
uniform volLinearFogEps: f32;
uniform volMedium: vec4f;

#ifdef VOL_SCREEN_SHADOWS
	uniform volViewProjection: mat4x4f;
	uniform volScreenShadowParams: vec4f;
#endif
uniform volAmbient: vec3f;

// (maximum distance, dithering strength, light extinction clamp, number of point and spot lights in the arrays)
uniform volParams: vec4f;

// (1 when the pipeline has nothing to draw this frame, unused, unused, unused)
uniform volPassParams: vec4f;

#if VOL_MAX_ARRAY_LIGHTS > 0
	uniform volLightData: array<vec4f, VOL_MAX_ARRAY_LIGHTS>;
	uniform volLightDiffuse: array<vec4f, VOL_MAX_ARRAY_LIGHTS>;
	uniform volLightDirection: array<vec4f, VOL_MAX_ARRAY_LIGHTS>;
	uniform volLightFalloff: array<vec4f, VOL_MAX_ARRAY_LIGHTS>;
#endif

#if VOL_SHADOW_SLOT_COUNT > 0
	uniform volShadowLightData: array<vec4f, VOL_SHADOW_SLOT_COUNT>;
	uniform volShadowLightDiffuse: array<vec4f, VOL_SHADOW_SLOT_COUNT>;
	uniform volShadowLightDirection: array<vec4f, VOL_SHADOW_SLOT_COUNT>;
	uniform volShadowLightFalloff: array<vec4f, VOL_SHADOW_SLOT_COUNT>;
	uniform volShadowInfo: array<vec4f, VOL_SHADOW_SLOT_COUNT>;
	uniform volShadowMatrix: array<mat4x4f, VOL_SHADOW_SLOT_COUNT>;
#endif

#ifdef VOL_CSM
	uniform volCsmLightData: vec4f;
	uniform volCsmLightDiffuse: vec4f;
	uniform volCsmLightDirection: vec4f;
	uniform volCsmLightFalloff: vec4f;
	uniform volCsmInfo: vec4f;
	uniform volCsmMatrices: array<mat4x4f, VOL_CSM_CASCADES>;

	#if VOL_CSM_KIND == 1
		var volCsmSamplerSampler: sampler_comparison;
		var volCsmSampler: texture_depth_2d_array;
	#else
		var volCsmSamplerSampler: sampler;
		var volCsmSampler: texture_2d_array<f32>;
	#endif
#endif

// Values shared by every function of the pass, computed once per pixel. Every position the raymarching
// manipulates is relative to the camera, which keeps the precision of the lights far from the origin.
var<private> volRayDir: vec3f;
var<private> volCosForward: f32;
var<private> volNoise: f32;
var<private> volJitter: f32;

#ifdef VOL_SCREEN_SHADOWS
	var<private> volDepthSize: vec2i;
	var<private> volClipOrigin: vec4f;
	var<private> volClipDirection: vec4f;
#endif

${packingHelpers}
${buildLinearDepthHelpers("textureSampler")}

fn volMod(x: f32, y: f32) -> f32 {
	return x - y * floor(x / y);
}

fn volFallOff(value: f32, clipSpaceXY: vec2f, frustumEdgeFalloff: f32) -> f32 {
	let mask = smoothstep(1.0 - frustumEdgeFalloff, 1.00000012, clamp(dot(clipSpaceXY, clipSpaceXY), 0.0, 1.0));
	return mix(value, 1.0, mask);
}

// Reproduces the depth metric computed by the "shadowsVertex" include of Babylon.js: the raw clip space
// Z is used, without the perspective divide, so the comparison matches what the shadow map stores.
fn volDepthMetric(clip: vec4f, depthValues: vec2f) -> f32 {
	#ifdef VOL_REVERSE_DEPTH
		return (-clip.z + depthValues.x) / depthValues.y;
	#else
		return (clip.z + depthValues.x) / depthValues.y;
	#endif
}

// Henyey-Greenstein phase function, normalised to 1 for an isotropic medium. @see the GLSL version.
fn volPhaseHG(c: f32, g: f32) -> f32 {
	let g2 = g * g;
	let d = max(1.0 + g2 - 2.0 * g * c, 1e-4);
	return (1.0 - g2) / (d * sqrt(d));
}

fn volBayer4(p: vec2f) -> f32 {
	let p1 = vec2f(volMod(floor(p.x), 2.0), volMod(floor(p.y), 2.0));
	let p2 = vec2f(volMod(floor(p.x * 0.5), 2.0), volMod(floor(p.y * 0.5), 2.0));

	let b1 = 2.0 * p1.x + 3.0 * p1.y - 4.0 * p1.x * p1.y;
	let b2 = 2.0 * p2.x + 3.0 * p2.y - 4.0 * p2.x * p2.y;

	return (b1 * 4.0 + b2) / 16.0;
}

fn volInterleavedGradientNoise(p: vec2f) -> f32 {
	return fract(52.9829189 * fract(dot(p, vec2f(0.06711056, 0.00583715))));
}

// Returns the offset of the samples of a light inside their strata. @see the GLSL version.
fn volStratumOffset(seed: f32) -> f32 {
	#if VOL_DITHER == 0
		return 0.5;
	#else
		return mix(0.5, fract(volNoise + seed * 0.618034), uniforms.volParams.y);
	#endif
}

// sigma(t) = -d/dt ln(T(t)), the exact analytic derivative of the optical depth. @see the GLSL version.
fn volFogExtinction(t: f32) -> f32 {
	#if VOL_FOG_MODE == 2
		return select(1.0 / max(uniforms.volFogInfos.z - t, uniforms.volLinearFogEps), 0.0, t < uniforms.volFogInfos.y);
	#elif VOL_FOG_MODE == 1
		return 2.0 * uniforms.volFogInfos.w * uniforms.volFogInfos.w * t;
	#else
		return uniforms.volFogInfos.w;
	#endif
}

// "height" is the absolute altitude of the sample, "t" its distance to the camera.
fn volExtinctionAt(height: f32, t: f32) -> f32 {
	var sigma = volFogExtinction(t);

	#ifdef VOL_HEIGHT_FOG
		sigma *= exp(-max(0.0, height - uniforms.volMedium.y) * uniforms.volMedium.z);
	#endif

	return sigma;
}

// Transmittance of the medium between the camera and the point of the view ray at the distance "t".
// @see the GLSL version.
#if VOL_TRANSMITTANCE == 1
	fn volHeightSegment(s1: f32, s2: f32) -> f32 {
		let y0 = uniforms.volCameraPosition.y - uniforms.volMedium.y;
		let h1 = y0 + s1 * volRayDir.y;
		let h2 = y0 + s2 * volRayDir.y;

		if (h1 + h2 <= 0.0) {
			return s2 - s1;
		}

		let e1 = exp(-uniforms.volMedium.z * max(h1, 0.0));
		let e2 = exp(-uniforms.volMedium.z * max(h2, 0.0));
		let slope = uniforms.volMedium.z * volRayDir.y;

		return select((e1 - e2) / slope, 0.5 * (e1 + e2) * (s2 - s1), abs(slope * (s2 - s1)) < 1e-4);
	}

	fn volOpticalDepth(t: f32) -> f32 {
		let crossing = select(-1.0, (uniforms.volMedium.y - uniforms.volCameraPosition.y) / volRayDir.y, abs(volRayDir.y) > 1e-6);

		var opticalLength = 0.0;
		if (crossing > 0.0 && crossing < t) {
			opticalLength = volHeightSegment(0.0, crossing) + volHeightSegment(crossing, t);
		} else {
			opticalLength = volHeightSegment(0.0, t);
		}

		return uniforms.volFogInfos.w * opticalLength;
	}

	fn volTransmittance(t: f32) -> f32 {
		return exp(-volOpticalDepth(t));
	}
#elif VOL_TRANSMITTANCE == 2
	var<private> volOpticalDepths: array<f32, VOL_TRANSMITTANCE_SAMPLES + 1>;
	var<private> volOpticalDepthStart: f32;
	var<private> volOpticalDepthScale: f32;

	fn volBuildOpticalDepths(tStart: f32, tEnd: f32) {
		let stepSize = (tEnd - tStart) / f32(VOL_TRANSMITTANCE_SAMPLES);

		volOpticalDepthStart = tStart;
		volOpticalDepthScale = 1.0 / stepSize;

		var previous = volExtinctionAt(uniforms.volCameraPosition.y + volRayDir.y * tStart, tStart);
		var opticalDepth = previous * tStart;

		volOpticalDepths[0] = opticalDepth;

		for (var i: i32 = 1; i <= VOL_TRANSMITTANCE_SAMPLES; i++) {
			let t = tStart + stepSize * f32(i);
			let sigma = volExtinctionAt(uniforms.volCameraPosition.y + volRayDir.y * t, t);

			opticalDepth += 0.5 * (previous + sigma) * stepSize;
			volOpticalDepths[i] = opticalDepth;
			previous = sigma;
		}
	}

	fn volOpticalDepth(t: f32) -> f32 {
		let x = clamp((t - volOpticalDepthStart) * volOpticalDepthScale, 0.0, f32(VOL_TRANSMITTANCE_SAMPLES));
		let i = min(i32(x), VOL_TRANSMITTANCE_SAMPLES - 1);

		return mix(volOpticalDepths[i], volOpticalDepths[i + 1], x - f32(i));
	}

	fn volTransmittance(t: f32) -> f32 {
		return exp(-volOpticalDepth(t));
	}
#elif VOL_FOG_MODE == 2
	fn volTransmittance(t: f32) -> f32 {
		return clamp((uniforms.volFogInfos.z - t) / max(uniforms.volFogInfos.z - uniforms.volFogInfos.y, uniforms.volLinearFogEps), 0.0, 1.0);
	}
#else
	fn volOpticalDepth(t: f32) -> f32 {
		#if VOL_FOG_MODE == 1
			let x = t * uniforms.volFogInfos.w;
			return x * x;
		#else
			return t * uniforms.volFogInfos.w;
		#endif
	}

	fn volTransmittance(t: f32) -> f32 {
		return exp(-volOpticalDepth(t));
	}
#endif

// Transmittance of the medium to the point at the distance "t", combined with the attenuation of the light on
// its way to that point. @see the GLSL version.
fn volCombinedTransmittance(t: f32, sigmaT: f32, distanceToLight: f32) -> f32 {
	#ifdef VOL_LIGHT_EXTINCTION
		let lightOpticalDepth = sigmaT * min(distanceToLight, uniforms.volParams.z);

		#ifdef VOL_OPTICAL_DEPTH
			return exp(-(volOpticalDepth(t) + lightOpticalDepth));
		#else
			return volTransmittance(t) * exp(-lightOpticalDepth);
		#endif
	#else
		return volTransmittance(t);
	#endif
}

#ifdef VOL_SCREEN_SHADOWS
	// Walks a segment going from a point of the medium towards a light through the depth buffer. The segment is
	// given in clip space, where it is affine. @see the GLSL version.
	fn volScreenShadow(clipStart: vec4f, clipDelta: vec4f, depthStart: f32, depthDelta: f32) -> f32 {
		for (var i: i32 = 1; i <= VOL_SCREEN_SHADOW_STEPS; i++) {
			let u = (f32(i) + volJitter) * (1.0 / f32(VOL_SCREEN_SHADOW_STEPS + 1));

			let clip = clipStart + clipDelta * u;
			if (clip.w <= 0.0) {
				continue;
			}

			let uv = (clip.xy / clip.w) * 0.5 + 0.5;
			if (uv.x < 0.0 || uv.x >= 1.0 || uv.y < 0.0 || uv.y >= 1.0) {
				continue;
			}

			let sceneDepth = volReadLinearDepth(vec2i(uv * vec2f(volDepthSize)));

			let depthDifference = depthStart + depthDelta * u - sceneDepth;
			let bias = max(uniforms.volScreenShadowParams.y * sceneDepth, uniforms.volCameraMinMaxZ.x);

			if (depthDifference > bias && depthDifference < uniforms.volScreenShadowParams.z * sceneDepth) {
				return 0.0;
			}
		}

		return 1.0;
	}

	// Occlusion of a point or a spot light, seen from the point of the view ray at the distance "t".
	fn volScreenShadowToLight(t: f32, lightClip: vec4f, lightDepth: f32, distanceToLight: f32) -> f32 {
		let clipStart = volClipOrigin + volClipDirection * t;
		let depthStart = t * volCosForward;
		let fraction = min(1.0, uniforms.volScreenShadowParams.x / max(distanceToLight, 1e-4));

		return volScreenShadow(clipStart, (lightClip - clipStart) * fraction, depthStart, (lightDepth - depthStart) * fraction);
	}
#endif

// Evaluates the in-scattered radiance coming from a directional light, without any shadowing.
fn volEvalDirectionalLight(data: vec4f, diffuse: vec4f) -> vec3f {
	return diffuse.rgb * volPhaseHG(dot(volRayDir, data.xyz), diffuse.a);
}

// Evaluates the in-scattered radiance coming from a point or a spot light at the given position, relative to
// the camera, without any shadowing nor extinction. Returns the radiance in "xyz" and the distance to the light in "w".
fn volEvalLocalLight(data: vec4f, diffuse: vec4f, direction: vec4f, falloff: vec4f, position: vec3f) -> vec4f {
	let toLight = data.xyz - position;
	let distanceToLight = max(length(toLight), 1e-4);
	let lightVector = toLight / distanceToLight;

	// Same linear attenuation as "computeLighting" in the "lightsFragmentFunctions" include.
	var attenuation = max(0.0, 1.0 - distanceToLight / falloff.x);

	if (data.w == 2.0) {
		let cosAngle = max(0.0, dot(direction.xyz, -lightVector));
		attenuation *= select(0.0, max(0.0, pow(cosAngle, falloff.y)), cosAngle >= direction.w);
	}

	if (attenuation <= 0.0) {
		return vec4f(0.0, 0.0, 0.0, distanceToLight);
	}

	return vec4f(diffuse.rgb * (attenuation * volPhaseHG(dot(volRayDir, lightVector), diffuse.a)), distanceToLight);
}

// Returns the part of the view ray crossing the cone of a spot light, cut by the sphere of its range.
// @see the GLSL version.
fn volConeChord(apex: vec3f, axis: vec3f, cosAngle: f32, range: f32, sphere: vec2f) -> vec2f {
	if (cosAngle <= 1e-3) {
		return sphere;
	}

	let origin = apex * (-1.0 / range);
	let dv = dot(volRayDir, axis);
	let ov = dot(origin, axis);
	let cos2 = cosAngle * cosAngle;

	let a = dv * dv - cos2;
	let b = dv * ov - cos2 * dot(volRayDir, origin);
	let c = ov * ov - cos2 * dot(origin, origin);

	if (abs(a) < 1e-4) {
		return sphere;
	}

	let discriminant = b * b - a * c;
	var cone = vec2f(0.0);

	if (a < 0.0) {
		if (discriminant <= 0.0) {
			return vec2f(1.0, -1.0);
		}

		let s = sqrt(discriminant);
		cone = vec2f((-b + s) / a, (-b - s) / a);

		if (dv * 0.5 * (cone.x + cone.y) + ov < 0.0) {
			return vec2f(1.0, -1.0);
		}
	} else {
		let s = sqrt(max(discriminant, 0.0));
		cone = select(vec2f(-1e30, (-b - s) / a), vec2f((-b + s) / a, 1e30), dv > 0.0);
	}

	return vec2f(max(sphere.x, (cone.x - 0.005) * range), min(sphere.y, (cone.y + 0.005) * range));
}

// Returns the part of the view ray, as distances to the camera, crossing the volume a point or a spot light
// reaches. @see the GLSL version.
fn volLightChord(data: vec4f, direction: vec4f, range: f32) -> vec2f {
	let closest = dot(data.xyz, volRayDir);
	let offset = data.xyz - volRayDir * closest;
	let halfChord2 = range * range - dot(offset, offset);

	if (halfChord2 <= 0.0) {
		return vec2f(1.0, -1.0);
	}

	let halfChord = sqrt(halfChord2);
	var chord = vec2f(closest - halfChord, closest + halfChord);

	if (data.w == 2.0) {
		chord = volConeChord(data.xyz, direction.xyz, direction.w, range, chord);
	}

	return chord;
}

// Returns the number of samples taken over the given chord of a light. @see the GLSL version.
fn volLocalSampleCount(chordLength: f32, range: f32, rayLength: f32) -> i32 {
	let count = max(f32(VOL_LIGHT_STEPS) * chordLength / (2.0 * range), f32(VOL_STEPS) * chordLength / rayLength);
	return clamp(i32(ceil(count)), 2, VOL_LOCAL_MAX_STEPS);
}

${slots.join("\n")}

#ifdef VOL_CSM
	// The parts of the view ray inside the box of each cascade, and the clip space position of the view ray in the
	// current cascade. @see the GLSL version.
	var<private> volCsmEntries: vec4f;
	var<private> volCsmExits: vec4f;
	var<private> volCsmCurrent: i32;
	var<private> volCsmClipOrigin: vec4f;
	var<private> volCsmClipDirection: vec4f;

	// Returns the part of the view ray inside the box of a cascade. @see the GLSL version.
	fn volCsmBoxInterval(origin: vec4f, direction: vec4f) -> vec2f {
		#ifdef VOL_NDC_HALF_Z
			let boxMin = vec3f(-0.96, -0.96, 0.0);
		#else
			let boxMin = vec3f(-0.96, -0.96, -1.0);
		#endif
		let boxMax = vec3f(0.96, 0.96, 1.0);

		let safeDirection = select(vec3f(1e-9), direction.xyz, abs(direction.xyz) > vec3f(1e-9));
		let inverseDirection = 1.0 / safeDirection;
		let t0 = (boxMin - origin.xyz) * inverseDirection;
		let t1 = (boxMax - origin.xyz) * inverseDirection;
		let tMin = min(t0, t1);
		let tMax = max(t0, t1);

		return vec2f(max(max(tMin.x, tMin.y), tMin.z), min(min(tMax.x, tMax.y), tMax.z));
	}

	fn volPrepareCsm() {
		volCsmEntries = vec4f(1e30);
		volCsmExits = vec4f(-1e30);

		for (var cascade: i32 = 0; cascade < VOL_CSM_CASCADES; cascade++) {
			let interval = volCsmBoxInterval(uniforms.volCsmMatrices[cascade] * vec4f(uniforms.volCameraPosition, 1.0), uniforms.volCsmMatrices[cascade] * vec4f(volRayDir, 0.0));
			volCsmEntries[cascade] = interval.x;
			volCsmExits[cascade] = interval.y;
		}

		volCsmCurrent = -1;
	}

	// Returns the shadowing of the point of the view ray at the distance "t" from the camera.
	fn volCsmShadow(t: f32) -> f32 {
		// The first cascade containing the sample is the most detailed one.
		var cascade: i32 = -1;
		for (var i: i32 = VOL_CSM_CASCADES - 1; i >= 0; i--) {
			if (t >= volCsmEntries[i] && t <= volCsmExits[i]) {
				cascade = i;
			}
		}

		if (cascade < 0) {
			return 1.0;
		}

		if (cascade != volCsmCurrent) {
			volCsmCurrent = cascade;
			volCsmClipOrigin = uniforms.volCsmMatrices[cascade] * vec4f(uniforms.volCameraPosition, 1.0);
			volCsmClipDirection = uniforms.volCsmMatrices[cascade] * vec4f(volRayDir, 0.0);
		}

		// The projection of a directional light is orthographic, "w" is always 1.
		let clip = volCsmClipOrigin + volCsmClipDirection * t;
		let clipSpace = clip.xyz;

		#if VOL_CSM_KIND == 1
			var uvDepth = 0.5 * clipSpace + vec3f(0.5);
			#ifdef VOL_NDC_HALF_Z
				uvDepth.z = clipSpace.z;
			#endif

			let shadow = textureSampleCompareLevel(volCsmSampler, volCsmSamplerSampler, uvDepth.xy, cascade, uvDepth.z);
			return volFallOff(mix(uniforms.volCsmInfo.x, 1.0, shadow), clipSpace.xy, uniforms.volCsmLightFalloff.z);
		#else
			let uv = 0.5 * clipSpace.xy + vec2f(0.5);
			let depthMetric = clamp(volDepthMetric(clip, uniforms.volCsmInfo.zw), 0.0, 1.0);

			#ifdef VOL_CSM_PACKED
				let shadowMapSample = volUnpack(textureSampleLevel(volCsmSampler, volCsmSamplerSampler, uv, cascade, 0.0));
			#else
				let shadowMapSample = textureSampleLevel(volCsmSampler, volCsmSamplerSampler, uv, cascade, 0.0).x;
			#endif

			return select(1.0, volFallOff(uniforms.volCsmInfo.x, clipSpace.xy, uniforms.volCsmLightFalloff.z), depthMetric > shadowMapSample);
		#endif
	}
#endif

#if VOL_GLOBAL_LIGHT_COUNT > 0
	// Marches the whole view ray for the lights that reach all of it: the directional lights. Returns the
	// in-scattered radiance in "xyz" and the number of lights evaluated in "w".
	fn volMarchGlobalLights(tStart: f32, tEnd: f32) -> vec4f {
		#if VOL_DIRECTIONAL_LIGHT_COUNT > 0
			#ifdef VOL_SCREEN_SHADOWS
				// The occlusion search of a directional light always walks the same direction over the same distance,
				// only its starting point moves along the view ray.
				var directionClip: array<vec4f, VOL_DIRECTIONAL_LIGHT_COUNT>;
				var directionDepth: array<f32, VOL_DIRECTIONAL_LIGHT_COUNT>;

				for (var li: i32 = 0; li < VOL_DIRECTIONAL_LIGHT_COUNT; li++) {
					let traced = uniforms.volLightData[li].xyz * uniforms.volScreenShadowParams.x;
					directionClip[li] = uniforms.volViewProjection * vec4f(traced, 0.0);
					directionDepth[li] = dot(traced, uniforms.volCameraForward);
				}
			#endif
		#endif

		#if VOL_DISTRIBUTION == 1
			let ratio = pow(tEnd / tStart, 1.0 / f32(VOL_STEPS));
		#else
			let uniformStep = (tEnd - tStart) / f32(VOL_STEPS);
		#endif

		var result = vec3f(0.0);
		var evaluatedLights = 0.0;
		var segmentStart = tStart;

		for (var i: i32 = 0; i < VOL_STEPS; i++) {
			#if VOL_DISTRIBUTION == 1
				let segmentEnd = segmentStart * ratio;
			#else
				let segmentEnd = segmentStart + uniformStep;
			#endif

			let segmentBegin = segmentStart;
			let dt = segmentEnd - segmentBegin;

			// The jitter picks the sample inside its own segment, so the marched interval stays exactly
			// [tStart, tEnd] whatever the dithering does.
			let t = segmentBegin + dt * volJitter;
			segmentStart = segmentEnd;

			let position = volRayDir * t;
			let sigmaT = volExtinctionAt(uniforms.volCameraPosition.y + position.y, t);

			if (sigmaT <= 1e-6) {
				continue;
			}

			// The transmittance at the START of the segment: the factor below accounts for the extinction
			// across the segment itself.
			let viewTransmittance = volTransmittance(segmentBegin);
			if (viewTransmittance < 0.003) {
				break;
			}

			var scattering = vec3f(0.0);
			var stepLights = 0.0;

${globalSlotContributions.join("")}
			#ifdef VOL_CSM
			{
				scattering += volEvalDirectionalLight(uniforms.volCsmLightData, uniforms.volCsmLightDiffuse) * mix(1.0, volCsmShadow(t), uniforms.volCsmLightFalloff.w);
				stepLights += 1.0;
			}
			#endif

			#if VOL_DIRECTIONAL_LIGHT_COUNT > 0
				for (var li: i32 = 0; li < VOL_DIRECTIONAL_LIGHT_COUNT; li++) {
					var contribution = volEvalDirectionalLight(uniforms.volLightData[li], uniforms.volLightDiffuse[li]);

					#ifdef VOL_SCREEN_SHADOWS
						// "volLightFalloff[li].z" carries whether this light asked to be occluded by the geometry.
						if (uniforms.volLightFalloff[li].z > 0.5) {
							contribution *= volScreenShadow(volClipOrigin + volClipDirection * t, directionClip[li], t * volCosForward, directionDepth[li]);
						}
					#endif

					scattering += contribution;
					stepLights += 1.0;
				}
			#endif

			evaluatedLights = max(evaluatedLights, stepLights);

			// Analytic integral of the in-scattering over the segment. @see the GLSL version.
			result += scattering * (viewTransmittance * (1.0 - exp(-sigmaT * dt)));
		}

		return vec4f(result, evaluatedLights);
	}
#endif

#if VOL_LOCAL_ARRAY_LIGHTS == 1
	// Integrates a point or a spot light of the arrays over the part of the view ray crossing its volume.
	// Returns the in-scattered radiance in "xyz" and whether the light was evaluated in "w".
	fn volIntegrateArrayLight(index: i32, tStart: f32, tEnd: f32) -> vec4f {
		let data = uniforms.volLightData[index];
		let direction = uniforms.volLightDirection[index];
		let falloff = uniforms.volLightFalloff[index];

		let chord = volLightChord(data, direction, falloff.x);
		let t0 = max(chord.x, tStart);
		let t1 = min(chord.y, tEnd);

		if (t1 <= t0) {
			return vec4f(0.0);
		}

		let diffuse = uniforms.volLightDiffuse[index];

		#ifdef VOL_SCREEN_SHADOWS
			// "falloff.z" carries whether this light asked to be occluded by the geometry.
			let occluded = falloff.z > 0.5;
			let lightClip = volClipOrigin + uniforms.volViewProjection * vec4f(data.xyz, 0.0);
			let lightDepth = dot(data.xyz, uniforms.volCameraForward);
		#endif

		${buildLocalLightIntegrationWGSL("f32(index)", `#ifdef VOL_SCREEN_SHADOWS
					if (occluded) {
						contribution *= volScreenShadowToLight(t, lightClip, lightDepth, distanceToLight);
					}
				#endif`)}
	}
#endif

@fragment
fn main(input: FragmentInputs) -> FragmentOutputs {
	// Reconstruct the world space direction of the view ray from the UV of the pixel.
	let farPoint = uniforms.volInverseViewProjection * vec4f(input.vUV * 2.0 - 1.0, 1.0, 1.0);
	volRayDir = normalize(farPoint.xyz / farPoint.w - uniforms.volCameraPosition);

	// The depth map stores the distance along the view axis, the ray is not aligned with it.
	volCosForward = max(dot(volRayDir, uniforms.volCameraForward), 1e-4);
	let pixel = fragmentInputs.position.xy;
	let depthSize = vec2i(textureDimensions(textureSampler));
	let viewZ = volReadLinearDepth(volScatterToDepthTexel(vec2i(pixel), depthSize));

	let tEnd = min(viewZ / volCosForward, uniforms.volParams.x);
	let tStart = max(uniforms.volCameraMinMaxZ.x / volCosForward, 1e-3);

	var result = vec3f(0.0);
	var finalTransmittance = 1.0;
	var evaluatedLights = 0.0;

	// WGSL has no early return from the fragment entry point, the whole integration is guarded instead. Nothing is
	// drawn either while no light reaches the view and the medium neither glows nor attenuates anything.
	if (tEnd > tStart && uniforms.volPassParams.x < 0.5) {
		// Offsets the samples inside their segments to trade the banding produced by a low sample count for noise.
		volNoise = 0.0;
		#if VOL_DITHER == 1
			volNoise = volBayer4(pixel);
		#elif VOL_DITHER == 2
			var ditherPosition = pixel;
			#ifdef VOL_TEMPORAL_JITTER
				ditherPosition += uniforms.volFrameIndex * 5.588238;
			#endif
			volNoise = volInterleavedGradientNoise(ditherPosition);
		#endif

		#ifdef VOL_TEMPORAL_ACCUMULATION
			// Each pixel walks the golden ratio sequence from the offset of its dithering pattern. @see the GLSL version.
			volNoise = fract(volNoise + uniforms.volTemporalOffset);
		#endif
		volJitter = volNoise * uniforms.volParams.y;

		#ifdef VOL_SCREEN_SHADOWS
			volDepthSize = depthSize;
			volClipOrigin = uniforms.volViewProjection * vec4f(uniforms.volCameraPosition, 1.0);
			volClipDirection = uniforms.volViewProjection * vec4f(volRayDir, 0.0);
		#endif

		#if VOL_TRANSMITTANCE == 2
			volBuildOpticalDepths(tStart, tEnd);
		#endif

		#ifdef VOL_CSM
			volPrepareCsm();
		#endif

		// The in-scattering of the constant ambient light has a closed form whatever the medium. @see the GLSL version.
		var accumulated = uniforms.volAmbient * (volTransmittance(tStart) - volTransmittance(tEnd));
		var lightResult = vec4f(0.0);

		#if VOL_GLOBAL_LIGHT_COUNT > 0
			lightResult = volMarchGlobalLights(tStart, tEnd);
			accumulated += lightResult.xyz;
			evaluatedLights += lightResult.w;
		#endif

${localSlotContributions.join("")}

		#if VOL_LOCAL_ARRAY_LIGHTS == 1
			let localEnd = VOL_DIRECTIONAL_LIGHT_COUNT + i32(uniforms.volParams.w + 0.5);

			for (var i: i32 = VOL_DIRECTIONAL_LIGHT_COUNT; i < VOL_MAX_ARRAY_LIGHTS; i++) {
				if (i >= localEnd) {
					break;
				}

				lightResult = volIntegrateArrayLight(i, tStart, tEnd);
				accumulated += lightResult.xyz;
				evaluatedLights += lightResult.w;
			}
		#endif

		// The scattering coefficient is a fraction of the extinction, which guarantees energy conservation.
		result = accumulated * uniforms.volMedium.x * uniforms.volFogColor;
		finalTransmittance = volTransmittance(tEnd);
	}

	#if VOL_DEBUG == 3
		// From blue for no light to red for 16 lights or more evaluated by the pixel.
		let ratioOfBudget = clamp(evaluatedLights / 16.0, 0.0, 1.0);
		result = vec3f(ratioOfBudget, 1.0 - abs(ratioOfBudget * 2.0 - 1.0), 1.0 - ratioOfBudget);
	#endif

	#ifdef VOL_LDR_ENCODE
		result = result / (1.0 + result);
	#endif

	fragmentOutputs.color = vec4f(result, finalTransmittance);
}
`
  );
}
__name(buildVolumetricLightingScatteringShaderWGSL, "buildVolumetricLightingScatteringShaderWGSL");
function buildVolumetricLightingTemporalShaderWGSL() {
  return (
    /* wgsl */
    `
varying vUV: vec2f;

var textureSampler: texture_2d<f32>;
var volHistorySamplerSampler: sampler;
var volHistorySampler: texture_2d<f32>;
var volLinearDepthSampler: texture_2d<f32>;

uniform volCameraMinMaxZ: vec2f;
uniform volDepthRatio: vec2f;
uniform volInverseViewProjection: mat4x4f;
uniform volCameraPosition: vec3f;
uniform volCameraForward: vec3f;
uniform volPreviousViewProjection: mat4x4f;

// (weight of the current frame, width of the clipping in standard deviations, maximum distance of the march,
// 1 when the history holds the previous frame, 2 when the previous frame had nothing to draw)
uniform volTemporalParams: vec4f;

// (distance the camera moved since the previous frame, part of the medium along the view ray whose change the
// delay of the history may lag behind)
uniform volTemporalMotion: vec2f;

${packingHelpers}
${buildLinearDepthHelpers("volLinearDepthSampler")}

@fragment
fn main(input: FragmentInputs) -> FragmentOutputs {
	let texel = vec2i(fragmentInputs.position.xy);
	let size = vec2i(textureDimensions(textureSampler));

	// Bounded so a light next to the camera, which a half float can't hold, never turns the history infinite.
	let current = min(textureLoad(textureSampler, texel, 0), vec4f(65000.0));
	var result = current;

	// WGSL has no early return from the fragment entry point, the accumulation is guarded instead.
	if (uniforms.volTemporalParams.w > 0.5) {
		// The end of the marched part of the view ray is reprojected in the previous frame. @see the GLSL version.
		let depthSize = vec2i(textureDimensions(volLinearDepthSampler));
		let viewZ = volReadLinearDepth(volScatterToDepthTexel(texel, depthSize));

		let farPoint = uniforms.volInverseViewProjection * vec4f(input.vUV * 2.0 - 1.0, 1.0, 1.0);
		let rayDir = normalize(farPoint.xyz / farPoint.w - uniforms.volCameraPosition);
		let t = min(viewZ / max(dot(rayDir, uniforms.volCameraForward), 1e-4), uniforms.volTemporalParams.z);

		let previousClip = uniforms.volPreviousViewProjection * vec4f(rayDir * t, 1.0);
		let previousUV = (previousClip.xy / previousClip.w) * 0.5 + 0.5;

		// Clamped so a position reprojected off the screen still reads a valid texel: whether the history is used
		// at all is decided below. Nothing to draw the previous frame: no light at all, seen through the same medium.
		let sampled = textureSampleLevel(volHistorySampler, volHistorySamplerSampler, clamp(previousUV, vec2f(0.0), vec2f(1.0)), 0.0);
		let history = select(sampled, vec4f(0.0, 0.0, 0.0, current.a), uniforms.volTemporalParams.w > 1.5);

		let inside = previousClip.w > 0.0 && all(previousUV >= vec2f(0.0)) && all(previousUV <= vec2f(1.0));

		// A history holding an infinity or a NaN would never recover from it.
		let finite = all(abs(history) < vec4f(1e20));

		if (inside && finite) {
			// Variance clipping: the history is kept within what the current frame shows around the pixel.
			var m1 = vec4f(0.0);
			var m2 = vec4f(0.0);

			for (var y: i32 = -1; y <= 1; y++) {
				for (var x: i32 = -1; x <= 1; x++) {
					let c = min(textureLoad(textureSampler, clamp(texel + vec2i(x, y), vec2i(0), size - 1), 0), vec4f(65000.0));
					m1 += c;
					m2 += c * c;
				}
			}

			let mean = m1 * (1.0 / 9.0);
			let sigma = sqrt(max(m2 * (1.0 / 9.0) - mean * mean, vec4f(0.0)));
			let clipped = clamp(history, mean - uniforms.volTemporalParams.y * sigma, mean + uniforms.volTemporalParams.y * sigma);

			// Moving the camera changes the medium along the view ray, the history is trusted less. @see the GLSL version.
			let motion = uniforms.volTemporalMotion.x / max(t, 1e-3);
			let factor = max(uniforms.volTemporalParams.x, motion / (motion + uniforms.volTemporalMotion.y));

			// The transmittance only depends on the length of medium in front of the surface. @see the GLSL version.
			let transmittanceChange = abs(history.a - current.a) / max(max(history.a, current.a), 1e-3);
			let historyWeight = (1.0 - factor) * (1.0 - smoothstep(0.02, 0.15, transmittanceChange));

			result = mix(current, clipped, historyWeight);
		}
	}

	fragmentOutputs.color = result;
}
`
  );
}
__name(buildVolumetricLightingTemporalShaderWGSL, "buildVolumetricLightingTemporalShaderWGSL");
function buildVolumetricLightingBlurShaderWGSL() {
  return (
    /* wgsl */
    `
varying vUV: vec2f;

var textureSampler: texture_2d<f32>;
var volLinearDepthSampler: texture_2d<f32>;

uniform volCameraMinMaxZ: vec2f;
uniform volDepthRatio: vec2f;
uniform volBlurDirection: vec2f;
uniform volBlurParams: vec2f;

// (1 when the pipeline has nothing to draw this frame, unused, unused, unused)
uniform volPassParams: vec4f;

${packingHelpers}
${buildLinearDepthHelpers("volLinearDepthSampler")}

@fragment
fn main(input: FragmentInputs) -> FragmentOutputs {
	// Nothing to draw this frame: the composition doesn't read the scattering buffer.
	if (uniforms.volPassParams.x > 0.5) {
		fragmentOutputs.color = vec4f(0.0, 0.0, 0.0, 1.0);
	} else {
		// Every tap is an exact texel compared using the depth the raymarching used for it. @see the GLSL version.
		let size = vec2i(textureDimensions(textureSampler));
		let depthSize = vec2i(textureDimensions(volLinearDepthSampler));
		let center = vec2i(fragmentInputs.position.xy);
		let direction = vec2i(uniforms.volBlurDirection);

		let centerDepth = volReadLinearDepth(volScatterToDepthTexel(center, depthSize));
		let inverseDepthThreshold = 1.0 / max(uniforms.volBlurParams.y * max(centerDepth, uniforms.volCameraMinMaxZ.x), 1e-4);
		let sigma = max(uniforms.volBlurParams.x, 1e-4);
		let inverseTwoSigma2 = 1.0 / (2.0 * sigma * sigma);

		var result = textureLoad(textureSampler, center, 0);
		var totalWeight = 1.0;

		for (var i: i32 = 1; i <= VOL_BLUR_RADIUS; i++) {
			let spatialWeight = exp(-f32(i * i) * inverseTwoSigma2);

			let positive = center + direction * i;
			let negative = center - direction * i;

			if (positive.x < size.x && positive.y < size.y) {
				let weight = spatialWeight * exp(-abs(volReadLinearDepth(volScatterToDepthTexel(positive, depthSize)) - centerDepth) * inverseDepthThreshold);
				result += textureLoad(textureSampler, positive, 0) * weight;
				totalWeight += weight;
			}

			if (negative.x >= 0 && negative.y >= 0) {
				let weight = spatialWeight * exp(-abs(volReadLinearDepth(volScatterToDepthTexel(negative, depthSize)) - centerDepth) * inverseDepthThreshold);
				result += textureLoad(textureSampler, negative, 0) * weight;
				totalWeight += weight;
			}
		}

		fragmentOutputs.color = result / totalWeight;
	}
}
`
  );
}
__name(buildVolumetricLightingBlurShaderWGSL, "buildVolumetricLightingBlurShaderWGSL");
function buildVolumetricLightingComposeShaderWGSL() {
  return (
    /* wgsl */
    `
varying vUV: vec2f;

var textureSampler: texture_2d<f32>;
var volSceneSamplerSampler: sampler;
var volSceneSampler: texture_2d<f32>;
var volLinearDepthSampler: texture_2d<f32>;

uniform volCameraMinMaxZ: vec2f;
uniform volDepthRatio: vec2f;
uniform volComposeParams: vec4f;

// (1 when the pipeline has nothing to draw this frame, unused, unused, unused)
uniform volPassParams: vec4f;

${packingHelpers}
${buildLinearDepthHelpers("volLinearDepthSampler")}

fn volMod(x: f32, y: f32) -> f32 {
	return x - y * floor(x / y);
}

fn volBayer8(p: vec2f) -> f32 {
	let p1 = vec2f(volMod(floor(p.x), 2.0), volMod(floor(p.y), 2.0));
	let p2 = vec2f(volMod(floor(p.x * 0.5), 2.0), volMod(floor(p.y * 0.5), 2.0));
	let p3 = vec2f(volMod(floor(p.x * 0.25), 2.0), volMod(floor(p.y * 0.25), 2.0));

	let b1 = 2.0 * p1.x + 3.0 * p1.y - 4.0 * p1.x * p1.y;
	let b2 = 2.0 * p2.x + 3.0 * p2.y - 4.0 * p2.x * p2.y;
	let b3 = 2.0 * p3.x + 3.0 * p3.y - 4.0 * p3.x * p3.y;

	return (b1 * 16.0 + b2 * 4.0 + b3) / 64.0;
}

// Nearest depth upsampling. @see the GLSL version.
fn volUpsample(uv0: vec2f, centerDepth: f32, depthSize: vec2i) -> vec4f {
	let size = vec2i(textureDimensions(textureSampler));
	let texelCoordinate = uv0 * vec2f(size) - 0.5;
	let baseCoordinate = floor(texelCoordinate);
	let fraction = texelCoordinate - baseCoordinate;

	let base = vec2i(baseCoordinate);
	let maximum = size - vec2i(1);

	let inverseDepthThreshold = 1.0 / max(uniforms.volComposeParams.z * max(centerDepth, uniforms.volCameraMinMaxZ.x), 1e-4);

	var result = vec4f(0.0);
	var totalWeight = 0.0;

	var nearestSample = vec4f(0.0);
	var nearestDistance = 1e20;

	for (var y: i32 = 0; y < 2; y++) {
		for (var x: i32 = 0; x < 2; x++) {
			let coordinates = clamp(base + vec2i(x, y), vec2i(0), maximum);

			let bilinearWeight = select(fraction.x, 1.0 - fraction.x, x == 0) * select(fraction.y, 1.0 - fraction.y, y == 0);
			let depthDistance = abs(volReadLinearDepth(volScatterToDepthTexel(coordinates, depthSize)) - centerDepth);

			let tap = textureLoad(textureSampler, coordinates, 0);

			if (depthDistance < nearestDistance) {
				nearestDistance = depthDistance;
				nearestSample = tap;
			}

			let weight = bilinearWeight / (1e-4 + depthDistance * inverseDepthThreshold);
			result += tap * weight;
			totalWeight += weight;
		}
	}

	// Every tap sits on the other side of a silhouette, fall back to the closest one instead of averaging.
	return select(nearestSample, result / totalWeight, totalWeight > 1e-4);
}

@fragment
fn main(input: FragmentInputs) -> FragmentOutputs {
	// Nothing to draw this frame: the color of the scene passes through. @see the GLSL version.
	if (uniforms.volPassParams.x > 0.5) {
		let sceneColor = textureSampleLevel(volSceneSampler, volSceneSamplerSampler, input.vUV, 0.0).rgb;
		fragmentOutputs.color = vec4f(sceneColor + (volBayer8(fragmentInputs.position.xy) - 0.5) * uniforms.volComposeParams.w, 1.0);
	} else {
		// The linear depth has the full resolution of the canvas. @see the GLSL version.
		let depthSize = vec2i(textureDimensions(volLinearDepthSampler));
		let centerDepth = volReadLinearDepth(min(vec2i(input.vUV * vec2f(depthSize)), depthSize - 1));

		var volumetric = volUpsample(input.vUV, centerDepth, depthSize);

		#ifdef VOL_LDR_ENCODE
			volumetric = vec4f(volumetric.rgb / max(vec3f(1e-4), 1.0 - volumetric.rgb), volumetric.a);
		#endif

		// WGSL has no early return from the fragment entry point, so the debug outputs are branches instead.
		#if VOL_DEBUG == 1 || VOL_DEBUG == 3
			fragmentOutputs.color = vec4f(volumetric.rgb * uniforms.volComposeParams.x, 1.0);
		#elif VOL_DEBUG == 2
			fragmentOutputs.color = vec4f(vec3f(volumetric.a), 1.0);
		#else
			var sceneColor = textureSampleLevel(volSceneSampler, volSceneSamplerSampler, input.vUV, 0.0).rgb;

			sceneColor *= mix(1.0, volumetric.a, uniforms.volComposeParams.y);

			var result = sceneColor + volumetric.rgb * uniforms.volComposeParams.x;

			// Breaks up the banding an 8 bits output would otherwise show on the smooth gradients of the shafts.
			result += (volBayer8(fragmentInputs.position.xy) - 0.5) * uniforms.volComposeParams.w;

			fragmentOutputs.color = vec4f(result, 1.0);
		#endif
	}
}
`
  );
}
__name(buildVolumetricLightingComposeShaderWGSL, "buildVolumetricLightingComposeShaderWGSL");
function getVolumetricLightingShadersWGSL() {
  return {
    linearDepth: buildVolumetricLightingLinearDepthShaderWGSL(),
    scattering: buildVolumetricLightingScatteringShaderWGSL(maxVolumetricShadowSlots),
    temporal: buildVolumetricLightingTemporalShaderWGSL(),
    blur: buildVolumetricLightingBlurShaderWGSL(),
    compose: buildVolumetricLightingComposeShaderWGSL()
  };
}
__name(getVolumetricLightingShadersWGSL, "getVolumetricLightingShadersWGSL");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/rendering/volumetric/shaders.js
var volumetricLightingLinearDepthShaderName = "volumetricLightingLinearDepth";
var volumetricLightingScatteringShaderName = "volumetricLightingScattering";
var volumetricLightingTemporalShaderName = "volumetricLightingTemporal";
var volumetricLightingBlurShaderName = "volumetricLightingBlur";
var volumetricLightingComposeShaderName = "volumetricLightingCompose";
var packingHelpers2 = (
  /* glsl */
  `
	// Stored scaled down by a power of two, which is exact: a 16 bits float then holds the far plane of the largest
	// scenes, with a relative precision of 0.05%.
	const float volLinearDepthScale = 1.0 / 1024.0;

	float volUnpack(vec4 color) {
		const vec4 bitShift = vec4(1.0 / (255.0 * 255.0 * 255.0), 1.0 / (255.0 * 255.0), 1.0 / 255.0, 1.0);
		return dot(color, bitShift);
	}
`
);
var depthMapHelpers2 = (
  /* glsl */
  `
	// Reads the texel under the given coordinates rather than filtering: the depth of a silhouette must not be
	// averaged with the sky, and the 32 bits float textures of the prepass renderer can't be filtered everywhere.
	float volSampleDepth(vec2 uv) {
		ivec2 size = textureSize(depthSampler, 0);
		ivec2 coordinates = min(ivec2(uv * vec2(size)), size - 1);

		#ifdef VOL_DEPTH_PACKED
			return volUnpack(texelFetch(depthSampler, coordinates, 0));
		#else
			return texelFetch(depthSampler, coordinates, 0).r;
		#endif
	}

	// Converts the raw value stored in the depth map into a distance along the view axis, in scene units.
	float volLinearDepth(float d) {
		#ifdef VOL_DEPTH_VIEWZ
			// The view space Z is stored directly, negative in a right handed scene. The sky is cleared to 0.
			float viewZ = abs(d);
			return (viewZ <= 0.0) ? volCameraMinMaxZ.y : viewZ;
		#else
			// The depth renderer stores "(clipZ + minZ) / (minZ + maxZ)", which is affine in the view space Z
			// for both the perspective and the orthographic projections. "volDepthUnpack" holds the two
			// coefficients of the exact inverse, computed on the CPU from the projection matrix of the scene.
			// The sky is cleared to 1, which maps back to the far plane.
			return volDepthUnpack.x * d + volDepthUnpack.y;
		#endif
	}
`
);
var linearDepthHelpers = (
  /* glsl */
  `
	// Returns the distance along the view axis, in scene units, of the texel at the given coordinates.
	float volReadLinearDepth(sampler2D s, ivec2 coordinates) {
		#ifdef VOL_LINEAR_DEPTH_PACKED
			return volUnpack(texelFetch(s, coordinates, 0)) * volCameraMinMaxZ.y;
		#else
			return texelFetch(s, coordinates, 0).r * (1.0 / volLinearDepthScale);
		#endif
	}

	// Returns the texel of the linear depth under the center of the given texel of the scattering buffer, which
	// is the depth the raymarching used for it. At half resolution the center of a texel lies exactly on the corner
	// of four texels of the depth: "volDepthRatio", the ratio between the two resolutions, is computed on the CPU
	// so every pass rounds exactly the same way and picks the same one.
	ivec2 volScatterToDepthTexel(ivec2 scatterTexel, ivec2 depthSize) {
		return min(ivec2((vec2(scatterTexel) + 0.5) * volDepthRatio), depthSize - 1);
	}
`
);
function buildVolumetricLightingLinearDepthShader() {
  return (
    /* glsl */
    `precision highp float;
precision highp int;

varying vec2 vUV;

uniform sampler2D textureSampler;
uniform highp sampler2D depthSampler;

uniform vec2 volCameraMinMaxZ;
uniform vec2 volDepthUnpack;

// (1 when the pipeline has nothing to draw this frame, unused, unused, unused)
uniform vec4 volPassParams;

${packingHelpers2}
${depthMapHelpers2}

vec4 volPack(float depth) {
	const vec4 bitShift = vec4(255.0 * 255.0 * 255.0, 255.0 * 255.0, 255.0, 1.0);
	const vec4 bitMask = vec4(0.0, 1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0);

	vec4 result = fract(depth * bitShift);
	result -= result.xxyz * bitMask;

	return result;
}

void main(void) {
	// Nothing reads the linear depth while the pipeline has nothing to draw.
	if (volPassParams.x > 0.5) {
		gl_FragColor = vec4(0.0);
		return;
	}

	float viewZ = volLinearDepth(volSampleDepth(vUV));

	#ifdef VOL_LINEAR_DEPTH_PACKED
		gl_FragColor = volPack(clamp(viewZ / volCameraMinMaxZ.y, 0.0, 0.9999999));
	#else
		// Bounded by the largest 16 bits float.
		gl_FragColor = vec4(min(viewZ * volLinearDepthScale, 65504.0), 0.0, 0.0, 1.0);
	#endif
}
`
  );
}
__name(buildVolumetricLightingLinearDepthShader, "buildVolumetricLightingLinearDepthShader");
function buildLocalLightIntegration(seed, occlusion) {
  return (
    /* glsl */
    `
		float chordLength = t1 - t0;

		// The point of the view ray closest to the light splits the chord in two halves over which both the
		// attenuation and the phase function are monotonic, which is where stratified samples do best.
		float closest = clamp(dot(data.xyz, volRayDir), t0, t1);
		if (closest - t0 < 0.02 * chordLength) {
			closest = t0;
		} else if (t1 - closest < 0.02 * chordLength) {
			closest = t1;
		}

		int count = volLocalSampleCount(chordLength, falloff.x, tEnd - tStart);
		int firstCount = closest <= t0 ? 0 : (closest >= t1 ? count : clamp(int(float(count) * (closest - t0) / chordLength + 0.5), 1, count - 1));

		float firstWidth = (closest - t0) / float(max(firstCount, 1));
		float secondWidth = (t1 - closest) / float(max(count - firstCount, 1));
		float stratum = volStratumOffset(${seed});

		vec3 result = vec3(0.0);

		for (int k = 0; k < VOL_LOCAL_MAX_STEPS; ++k) {
			if (k >= count) {
				break;
			}

			bool inFirstHalf = k < firstCount;
			float width = inFirstHalf ? firstWidth : secondWidth;
			float t = inFirstHalf ? t0 + width * (float(k) + stratum) : closest + width * (float(k - firstCount) + stratum);

			vec3 position = volRayDir * t;
			float sigmaT = volExtinctionAt(volCameraPosition.y + position.y, t);

			float distanceToLight;
			vec3 contribution = volEvalLocalLight(data, diffuse, direction, falloff, position, distanceToLight);

			if (contribution.r + contribution.g + contribution.b > 0.0) {
				${occlusion}
				result += contribution * (volCombinedTransmittance(t, sigmaT, distanceToLight) * sigmaT * width);
			}
		}

		return vec4(result, 1.0);
`
  );
}
__name(buildLocalLightIntegration, "buildLocalLightIntegration");
function buildVolumetricLightingScatteringShader(shadowSlotCount) {
  const slots = [];
  const globalSlotContributions = [];
  const localSlotContributions = [];
  for (let i = 0; i < shadowSlotCount; ++i) {
    slots.push(
      /* glsl */
      `
#if VOL_SHADOW_SLOT_COUNT > {X}
	#if VOL_SHADOW_KIND{X} == 2
		uniform samplerCube volShadowSampler{X};
	#elif VOL_SHADOW_KIND{X} == 1
		uniform highp sampler2DShadow volShadowSampler{X};
	#else
		uniform sampler2D volShadowSampler{X};
	#endif

	// Returns the shadowing of a point given its position relative to the camera and, for the 2d shadow maps, its
	// position in the clip space of the light, which the callers compute the cheapest way they can.
	float volShadow{X}(vec3 position, vec4 clip) {
		vec4 info = volShadowInfo[{X}];
		float edge = volShadowLightFalloff[{X}].z;

		#if VOL_SHADOW_KIND{X} == 2
			// Cube shadow map of a point light. It stores the radial distance to the light.
			vec3 toFragment = position - volShadowLightData[{X}].xyz;
			float depth = clamp((length(toFragment) + info.z) / info.w, 0.0, 1.0);

			toFragment = normalize(toFragment);
			toFragment.y = -toFragment.y;

			#ifdef VOL_SHADOW_PACKED{X}
				float shadowMapSample = volUnpack(textureCube(volShadowSampler{X}, toFragment));
			#else
				float shadowMapSample = textureCube(volShadowSampler{X}, toFragment).x;
			#endif

			#if VOL_SHADOW_MODE{X} == 1
				// Exponential shadow map, same encoding as the 2d case. "info.y" holds the depth scale.
				return 1.0 - clamp(exp(min(87.0, info.y * depth)) * shadowMapSample, 0.0, 1.0 - info.x);
			#elif VOL_SHADOW_MODE{X} == 2
				return clamp(exp(min(87.0, -info.y * (depth - shadowMapSample))), info.x, 1.0);
			#else
				return depth > shadowMapSample ? info.x : 1.0;
			#endif
		#else
			vec3 clipSpace = clip.xyz / clip.w;

			// "getTransformMatrix" gives the world to light clip space matrix without the [-1, 1] -> [0, 1] bias.
			#if VOL_SHADOW_KIND{X} == 1
				vec3 uvDepth = vec3(0.5 * clipSpace + vec3(0.5));
				#ifdef VOL_NDC_HALF_Z
					uvDepth.z = clipSpace.z;
				#endif

				// Same guard as "computeShadowWithPCF1": past the far plane of the shadow map the hardware
				// comparison would fail against every texel a caster wrote, reporting the sample as occluded
				// while the surfaces at the same distance are lit by the material path.
				float pcfDepthMetric = volDepthMetric(clip, info.zw);
				if (pcfDepthMetric < 0.0 || pcfDepthMetric > 1.0 || uvDepth.x < 0.0 || uvDepth.x > 1.0 || uvDepth.y < 0.0 || uvDepth.y > 1.0) {
					return 1.0;
				}

				// Hardware comparison sampling. "info.y" holds the inverse of the size of the shadow map.
				#if VOL_PCF_TAPS == 4
					float shadow = 0.25 * (
						texture2DLodEXT(volShadowSampler{X}, uvDepth + vec3(-0.5 * info.y, -0.5 * info.y, 0.0), 0.) +
						texture2DLodEXT(volShadowSampler{X}, uvDepth + vec3( 0.5 * info.y, -0.5 * info.y, 0.0), 0.) +
						texture2DLodEXT(volShadowSampler{X}, uvDepth + vec3(-0.5 * info.y,  0.5 * info.y, 0.0), 0.) +
						texture2DLodEXT(volShadowSampler{X}, uvDepth + vec3( 0.5 * info.y,  0.5 * info.y, 0.0), 0.)
					);
				#else
					float shadow = texture2DLodEXT(volShadowSampler{X}, uvDepth, 0.);
				#endif

				return volFallOff(mix(info.x, 1.0, shadow), clipSpace.xy, edge);
			#else
				vec2 uv = 0.5 * clipSpace.xy + vec2(0.5);
				if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
					return 1.0;
				}

				float depthMetric = clamp(volDepthMetric(clip, info.zw), 0.0, 1.0);

				#ifdef VOL_SHADOW_PACKED{X}
					float shadowMapSample = volUnpack(texture2DLodEXT(volShadowSampler{X}, uv, 0.));
				#else
					float shadowMapSample = texture2DLodEXT(volShadowSampler{X}, uv, 0.).x;
				#endif

				#if VOL_SHADOW_MODE{X} == 1
					// Exponential shadow map. "info.y" holds the depth scale of the generator.
					return volFallOff(1.0 - clamp(exp(min(87.0, info.y * depthMetric)) * shadowMapSample, 0.0, 1.0 - info.x), clipSpace.xy, edge);
				#elif VOL_SHADOW_MODE{X} == 2
					// Close exponential shadow map.
					return volFallOff(clamp(exp(min(87.0, -info.y * (depthMetric - shadowMapSample))), info.x, 1.0), clipSpace.xy, edge);
				#else
					return depthMetric > shadowMapSample ? volFallOff(info.x, clipSpace.xy, edge) : 1.0;
				#endif
			#endif
		#endif
	}

	#if VOL_SHADOW_LOCAL{X} == 1
		// Point or spot light casting volumetric shadows: integrated over its own volume, like the others.
		vec4 volIntegrateShadowSlot{X}(float tStart, float tEnd) {
			vec4 data = volShadowLightData[{X}];
			vec4 direction = volShadowLightDirection[{X}];
			vec4 falloff = volShadowLightFalloff[{X}];

			vec2 chord = volLightChord(data, direction, falloff.x);
			float t0 = max(chord.x, tStart);
			float t1 = min(chord.y, tEnd);

			if (t1 <= t0) {
				return vec4(0.0);
			}

			vec4 diffuse = volShadowLightDiffuse[{X}];

			// The light clip space position of the points of the view ray is affine in their distance to the camera,
			// so each sample only costs a multiply-add instead of a matrix product.
			vec4 clipOrigin = volShadowMatrix[{X}] * vec4(volCameraPosition, 1.0);
			vec4 clipDirection = volShadowMatrix[{X}] * vec4(volRayDir, 0.0);
			${buildLocalLightIntegration("float({X}) + 0.5", "contribution *= mix(1.0, volShadow{X}(position, clipOrigin + clipDirection * t), falloff.w);")}
		}
	#endif
#endif
`.replace(/\{X\}/g, i.toString())
    );
    globalSlotContributions.push(
      /* glsl */
      `
			#if VOL_SHADOW_SLOT_COUNT > {X}
				#if VOL_SHADOW_LOCAL{X} == 0
				{
					// The matrix product is recomputed rather than kept affine: the march already holds many values
					// alive across its steps, and fewer live registers means more pixels processed in parallel.
					float shadow = volShadow{X}(position, volShadowMatrix[{X}] * vec4(volCameraPosition + position, 1.0));
					scattering += volEvalDirectionalLight(volShadowLightData[{X}], volShadowLightDiffuse[{X}]) * mix(1.0, shadow, volShadowLightFalloff[{X}].w);
					stepLights += 1.0;
				}
				#endif
			#endif
`.replace(/\{X\}/g, i.toString())
    );
    localSlotContributions.push(
      /* glsl */
      `
	#if VOL_SHADOW_SLOT_COUNT > {X}
		#if VOL_SHADOW_LOCAL{X} == 1
			lightResult = volIntegrateShadowSlot{X}(tStart, tEnd);
			accumulated += lightResult.rgb;
			evaluatedLights += lightResult.a;
		#endif
	#endif
`.replace(/\{X\}/g, i.toString())
    );
  }
  return (
    /* glsl */
    `precision highp float;
precision highp int;

varying vec2 vUV;

// Full resolution linear depth of the scene, written by the linear depth pass.
uniform highp sampler2D textureSampler;

// Ratio between the resolution of the linear depth and the resolution of the scattering buffer.
uniform vec2 volDepthRatio;

uniform mat4 volInverseViewProjection;
uniform vec3 volCameraPosition;
uniform vec3 volCameraForward;
uniform vec2 volCameraMinMaxZ;
uniform float volFrameIndex;

// Offset of the current frame along the golden ratio sequence the samples walk with the temporal accumulation.
uniform float volTemporalOffset;

uniform vec4 volFogInfos;
uniform vec3 volFogColor;
uniform float volLinearFogEps;
uniform vec4 volMedium;

#ifdef VOL_SCREEN_SHADOWS
	uniform mat4 volViewProjection;
	uniform vec4 volScreenShadowParams;
#endif
uniform vec3 volAmbient;

// (maximum distance, dithering strength, light extinction clamp, number of point and spot lights in the arrays)
uniform vec4 volParams;

// (1 when the pipeline has nothing to draw this frame, unused, unused, unused)
uniform vec4 volPassParams;

#if VOL_MAX_ARRAY_LIGHTS > 0
	uniform vec4 volLightData[VOL_MAX_ARRAY_LIGHTS];
	uniform vec4 volLightDiffuse[VOL_MAX_ARRAY_LIGHTS];
	uniform vec4 volLightDirection[VOL_MAX_ARRAY_LIGHTS];
	uniform vec4 volLightFalloff[VOL_MAX_ARRAY_LIGHTS];
#endif

#if VOL_SHADOW_SLOT_COUNT > 0
	uniform vec4 volShadowLightData[VOL_SHADOW_SLOT_COUNT];
	uniform vec4 volShadowLightDiffuse[VOL_SHADOW_SLOT_COUNT];
	uniform vec4 volShadowLightDirection[VOL_SHADOW_SLOT_COUNT];
	uniform vec4 volShadowLightFalloff[VOL_SHADOW_SLOT_COUNT];
	uniform vec4 volShadowInfo[VOL_SHADOW_SLOT_COUNT];
	uniform mat4 volShadowMatrix[VOL_SHADOW_SLOT_COUNT];
#endif

#ifdef VOL_CSM
	uniform vec4 volCsmLightData;
	uniform vec4 volCsmLightDiffuse;
	uniform vec4 volCsmLightDirection;
	uniform vec4 volCsmLightFalloff;
	uniform vec4 volCsmInfo;
	uniform mat4 volCsmMatrices[VOL_CSM_CASCADES];

	#if VOL_CSM_KIND == 1
		uniform highp sampler2DArrayShadow volCsmSampler;
	#else
		uniform highp sampler2DArray volCsmSampler;
	#endif
#endif

// Values shared by every function of the pass, computed once per pixel. Every position the raymarching
// manipulates is relative to the camera, which keeps the precision of the lights far from the origin.
vec3 volRayDir;
float volCosForward;
float volNoise;
float volJitter;

#ifdef VOL_SCREEN_SHADOWS
	ivec2 volDepthSize;
	vec4 volClipOrigin;
	vec4 volClipDirection;
#endif

${packingHelpers2}
${linearDepthHelpers}

float volFallOff(float value, vec2 clipSpaceXY, float frustumEdgeFalloff) {
	float mask = smoothstep(1.0 - frustumEdgeFalloff, 1.00000012, clamp(dot(clipSpaceXY, clipSpaceXY), 0.0, 1.0));
	return mix(value, 1.0, mask);
}

// Reproduces the depth metric computed by the "shadowsVertex" include of Babylon.js: the raw clip space
// Z is used, without the perspective divide, so the comparison matches what the shadow map stores.
float volDepthMetric(vec4 clip, vec2 depthValues) {
	#ifdef VOL_REVERSE_DEPTH
		return (-clip.z + depthValues.x) / depthValues.y;
	#else
		return (clip.z + depthValues.x) / depthValues.y;
	#endif
}

// Henyey-Greenstein phase function. "c" is the cosine of the angle between the direction the light
// travels and the direction the ray travels, "g" the anisotropy of the medium.
//
// Normalised to 1 for an isotropic medium rather than to an integral of 1 over the sphere: the lighting of
// the surfaces in Babylon.js doesn't divide by PI either, so an intensity of 1 means the same thing for the
// light shafts as it does for the surfaces the same light hits.
float volPhaseHG(float c, float g) {
	float g2 = g * g;
	float d = max(1.0 + g2 - 2.0 * g * c, 1e-4);
	return (1.0 - g2) / (d * sqrt(d));
}

float volBayer4(vec2 p) {
	vec2 p1 = mod(floor(p), 2.0);
	vec2 p2 = mod(floor(p * 0.5), 2.0);

	float b1 = 2.0 * p1.x + 3.0 * p1.y - 4.0 * p1.x * p1.y;
	float b2 = 2.0 * p2.x + 3.0 * p2.y - 4.0 * p2.x * p2.y;

	return (b1 * 4.0 + b2) / 16.0;
}

float volInterleavedGradientNoise(vec2 p) {
	return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
}

// Returns the offset of the samples of a light inside their strata. Each light gets its own offset, a golden
// ratio sequence seeded by the noise of the pixel, so the lights don't all show the same pattern.
float volStratumOffset(float seed) {
	#if VOL_DITHER == 0
		return 0.5;
	#else
		return mix(0.5, fract(volNoise + seed * 0.618034), volParams.y);
	#endif
}

// Extinction coefficient of the medium, the exact analytic derivative of its optical depth:
// sigma(t) = -d/dt ln(T(t)). Keeping the two in sync is what makes the result independent from the number
// of samples the medium is integrated with. "volFogInfos" is (mode, start, end, density).
float volFogExtinction(float t) {
	#if VOL_FOG_MODE == 2
		// T = (end - t) / (end - start) -> sigma = 1 / (end - t), clamped to avoid the pole at t = end.
		return t < volFogInfos.y ? 0.0 : 1.0 / max(volFogInfos.z - t, volLinearFogEps);
	#elif VOL_FOG_MODE == 1
		// T = e^(-(t * density)^2) -> sigma = 2 * density^2 * t.
		return 2.0 * volFogInfos.w * volFogInfos.w * t;
	#else
		// T = e^(-t * density) -> sigma = density (the medium is uniform).
		return volFogInfos.w;
	#endif
}

// "height" is the absolute altitude of the sample, "t" its distance to the camera.
float volExtinctionAt(float height, float t) {
	float sigma = volFogExtinction(t);

	#ifdef VOL_HEIGHT_FOG
		sigma *= exp(-max(0.0, height - volMedium.y) * volMedium.z);
	#endif

	return sigma;
}

// Transmittance of the medium between the camera and the point of the view ray at the distance "t". The
// three models match the ones the fog of Babylon.js uses, but every value comes from the configuration of
// this pipeline: the medium the shafts are computed in is independent from the fog applied on the surfaces.
#if VOL_TRANSMITTANCE == 1
	// Length of medium at full density equivalent to the part [s1, s2] of the view ray, which lies entirely on
	// one side of the base altitude of the height falloff.
	float volHeightSegment(float s1, float s2) {
		float y0 = volCameraPosition.y - volMedium.y;
		float h1 = y0 + s1 * volRayDir.y;
		float h2 = y0 + s2 * volRayDir.y;

		// Under the base altitude the medium has its full density.
		if (h1 + h2 <= 0.0) {
			return s2 - s1;
		}

		// Over it, the integral of e^(-falloff * height) along the ray, falling back on the midpoint rule
		// when the altitude barely changes along the segment, where the closed form would cancel out.
		float e1 = exp(-volMedium.z * max(h1, 0.0));
		float e2 = exp(-volMedium.z * max(h2, 0.0));
		float slope = volMedium.z * volRayDir.y;

		return abs(slope * (s2 - s1)) < 1e-4 ? 0.5 * (e1 + e2) * (s2 - s1) : (e1 - e2) / slope;
	}

	// Exponential medium whose density decreases with the altitude: exact, split where the ray crosses the base altitude.
	float volOpticalDepth(float t) {
		float crossing = abs(volRayDir.y) > 1e-6 ? (volMedium.y - volCameraPosition.y) / volRayDir.y : -1.0;
		float opticalLength = (crossing > 0.0 && crossing < t) ? volHeightSegment(0.0, crossing) + volHeightSegment(crossing, t) : volHeightSegment(0.0, t);

		return volFogInfos.w * opticalLength;
	}

	float volTransmittance(float t) {
		return exp(-volOpticalDepth(t));
	}
#elif VOL_TRANSMITTANCE == 2
	// The other fog modes combined with the height falloff have no closed form: their optical depth is
	// integrated once per pixel along the view ray, and interpolated from there.
	float volOpticalDepths[VOL_TRANSMITTANCE_SAMPLES + 1];
	float volOpticalDepthStart;
	float volOpticalDepthScale;

	void volBuildOpticalDepths(float tStart, float tEnd) {
		float stepSize = (tEnd - tStart) / float(VOL_TRANSMITTANCE_SAMPLES);

		volOpticalDepthStart = tStart;
		volOpticalDepthScale = 1.0 / stepSize;

		// The medium between the camera and the near plane is too thin to be worth integrating.
		float previous = volExtinctionAt(volCameraPosition.y + volRayDir.y * tStart, tStart);
		float opticalDepth = previous * tStart;

		volOpticalDepths[0] = opticalDepth;

		for (int i = 1; i <= VOL_TRANSMITTANCE_SAMPLES; ++i) {
			float t = tStart + stepSize * float(i);
			float sigma = volExtinctionAt(volCameraPosition.y + volRayDir.y * t, t);

			opticalDepth += 0.5 * (previous + sigma) * stepSize;
			volOpticalDepths[i] = opticalDepth;
			previous = sigma;
		}
	}

	float volOpticalDepth(float t) {
		float x = clamp((t - volOpticalDepthStart) * volOpticalDepthScale, 0.0, float(VOL_TRANSMITTANCE_SAMPLES));
		int i = min(int(x), VOL_TRANSMITTANCE_SAMPLES - 1);

		return mix(volOpticalDepths[i], volOpticalDepths[i + 1], x - float(i));
	}

	float volTransmittance(float t) {
		return exp(-volOpticalDepth(t));
	}
#elif VOL_FOG_MODE == 2
	// The linear mode is the only one whose transmittance, rather than its optical depth, is simple.
	float volTransmittance(float t) {
		return clamp((volFogInfos.z - t) / max(volFogInfos.z - volFogInfos.y, volLinearFogEps), 0.0, 1.0);
	}
#else
	float volOpticalDepth(float t) {
		#if VOL_FOG_MODE == 1
			float x = t * volFogInfos.w;
			return x * x;
		#else
			return t * volFogInfos.w;
		#endif
	}

	float volTransmittance(float t) {
		return exp(-volOpticalDepth(t));
	}
#endif

// Transmittance of the medium between the camera and the point of the view ray at the distance "t", combined
// with the attenuation of the light on its way from the light to that point. Both are exponentials of optical
// depths whenever the fog mode allows it, which saves one exponential per sample.
float volCombinedTransmittance(float t, float sigmaT, float distanceToLight) {
	#ifdef VOL_LIGHT_EXTINCTION
		// Exact for an exponential fog, which describes a homogeneous medium, and a faithful approximation for
		// the other modes.
		float lightOpticalDepth = sigmaT * min(distanceToLight, volParams.z);

		#ifdef VOL_OPTICAL_DEPTH
			return exp(-(volOpticalDepth(t) + lightOpticalDepth));
		#else
			return volTransmittance(t) * exp(-lightOpticalDepth);
		#endif
	#else
		return volTransmittance(t);
	#endif
}

#ifdef VOL_SCREEN_SHADOWS
	// Walks a segment going from a point of the medium towards a light through the depth buffer, and reports the
	// point as occluded as soon as one of the samples sits behind what the depth buffer holds. This is what stops
	// the shafts of a light that has no shadow map from showing through the walls between it and the camera.
	//
	// The segment is given in clip space: the sample at the fraction "u" of the segment is "clipStart + u * clipDelta".
	// The clip space position is affine in the world position, and so is the distance along the view axis, so
	// interpolating both is exact and replaces the matrix product each sample would cost with multiply-adds.
	// "volScreenShadowParams" is (maximum traced distance, relative depth bias, relative surface thickness, unused).
	float volScreenShadow(vec4 clipStart, vec4 clipDelta, float depthStart, float depthDelta) {
		for (int i = 1; i <= VOL_SCREEN_SHADOW_STEPS; ++i) {
			// The samples are spread strictly between the shaded point and the end of the segment: the point
			// itself is on the view ray, so it always sits in front of the depth buffer.
			float u = (float(i) + volJitter) * (1.0 / float(VOL_SCREEN_SHADOW_STEPS + 1));

			vec4 clip = clipStart + clipDelta * u;
			if (clip.w <= 0.0) {
				continue;
			}

			vec2 uv = (clip.xy / clip.w) * 0.5 + 0.5;
			if (uv.x < 0.0 || uv.x >= 1.0 || uv.y < 0.0 || uv.y >= 1.0) {
				continue;
			}

			float sceneDepth = volReadLinearDepth(textureSampler, ivec2(uv * vec2(volDepthSize)));

			// Bounded by the assumed thickness of the surface: a sample much further away than the surface it is
			// hidden behind has passed it rather than been stopped by it, and counting it as occluded would
			// stamp the silhouette of everything in the foreground into the shafts behind it.
			float depthDifference = depthStart + depthDelta * u - sceneDepth;
			float bias = max(volScreenShadowParams.y * sceneDepth, volCameraMinMaxZ.x);

			if (depthDifference > bias && depthDifference < volScreenShadowParams.z * sceneDepth) {
				return 0.0;
			}
		}

		return 1.0;
	}

	// Occlusion of a point or a spot light, seen from the point of the view ray at the distance "t". The
	// search stops at the light, or after the maximum traced distance when the light is further than that.
	float volScreenShadowToLight(float t, vec4 lightClip, float lightDepth, float distanceToLight) {
		vec4 clipStart = volClipOrigin + volClipDirection * t;
		float depthStart = t * volCosForward;
		float fraction = min(1.0, volScreenShadowParams.x / max(distanceToLight, 1e-4));

		return volScreenShadow(clipStart, (lightClip - clipStart) * fraction, depthStart, (lightDepth - depthStart) * fraction);
	}
#endif

// Evaluates the in-scattered radiance coming from a directional light, without any shadowing. "data.xyz"
// already holds the direction pointing to the light, and the scattering angle is the angle between the
// direction the light travels (-data.xyz) and the direction the ray travels (-volRayDir).
vec3 volEvalDirectionalLight(vec4 data, vec4 diffuse) {
	return diffuse.rgb * volPhaseHG(dot(volRayDir, data.xyz), diffuse.a);
}

// Evaluates the in-scattered radiance coming from a point or a spot light at the given position, relative to
// the camera, without any shadowing nor extinction.
vec3 volEvalLocalLight(vec4 data, vec4 diffuse, vec4 direction, vec4 falloff, vec3 position, out float distanceToLight) {
	vec3 toLight = data.xyz - position;
	distanceToLight = max(length(toLight), 1e-4);

	vec3 lightVector = toLight / distanceToLight;

	// Same linear attenuation as "computeLighting" in the "lightsFragmentFunctions" include.
	float attenuation = max(0.0, 1.0 - distanceToLight / falloff.x);

	if (data.w == 2.0) {
		float cosAngle = max(0.0, dot(direction.xyz, -lightVector));
		attenuation *= (cosAngle >= direction.w) ? max(0.0, pow(cosAngle, falloff.y)) : 0.0;
	}

	if (attenuation <= 0.0) {
		return vec3(0.0);
	}

	return diffuse.rgb * (attenuation * volPhaseHG(dot(volRayDir, lightVector), diffuse.a));
}

// Returns the part of the view ray crossing the cone of a spot light, cut by the sphere of its range.
// "apex" is relative to the camera and "sphere" is the part of the ray crossing the sphere of the range.
vec2 volConeChord(vec3 apex, vec3 axis, float cosAngle, float range, vec2 sphere) {
	// Only a convex cone can be intersected exactly, anything wider keeps the sphere of the range.
	if (cosAngle <= 1e-3) {
		return sphere;
	}

	// Expressed in units of the range of the light, which keeps the quadratic well conditioned. A point of the
	// view ray is inside the cone when "dot(p - apex, axis) >= |p - apex| * cos(angle)".
	vec3 origin = apex * (-1.0 / range);
	float dv = dot(volRayDir, axis);
	float ov = dot(origin, axis);
	float cos2 = cosAngle * cosAngle;

	float a = dv * dv - cos2;
	float b = dv * ov - cos2 * dot(volRayDir, origin);
	float c = ov * ov - cos2 * dot(origin, origin);

	// The ray is parallel to the surface of the cone, the sphere is a conservative bound.
	if (abs(a) < 1e-4) {
		return sphere;
	}

	float discriminant = b * b - a * c;
	vec2 cone;

	if (a < 0.0) {
		// Less aligned with the axis than the surface of the cone: the ray crosses it along a single segment.
		if (discriminant <= 0.0) {
			return vec2(1.0, -1.0);
		}

		float s = sqrt(discriminant);
		cone = vec2((-b + s) / a, (-b - s) / a);

		// The segment must belong to the cone of the light, not to its mirror image behind the apex.
		if (dv * 0.5 * (cone.x + cone.y) + ov < 0.0) {
			return vec2(1.0, -1.0);
		}
	} else {
		// More aligned with the axis than the surface: the line crosses both the cone and its mirror image, and
		// only the half line going in the direction of the axis belongs to the cone of the light.
		float s = sqrt(max(discriminant, 0.0));
		cone = dv > 0.0 ? vec2((-b + s) / a, 1e30) : vec2(-1e30, (-b - s) / a);
	}

	// Slightly widened: the samples outside of the cone are rejected by the lighting itself, while an interval
	// cut too short by the rounding errors would clip the edges of the cone.
	return vec2(max(sphere.x, (cone.x - 0.005) * range), min(sphere.y, (cone.y + 0.005) * range));
}

// Returns the part of the view ray, as distances to the camera, crossing the volume a point or a spot light
// reaches. An empty part is returned as an interval that ends before it starts.
vec2 volLightChord(vec4 data, vec4 direction, float range) {
	// Computed from the point of the ray closest to the light rather than with the textbook discriminant,
	// which cancels out catastrophically for the small lights far from the camera.
	float closest = dot(data.xyz, volRayDir);
	vec3 offset = data.xyz - volRayDir * closest;
	float halfChord2 = range * range - dot(offset, offset);

	if (halfChord2 <= 0.0) {
		return vec2(1.0, -1.0);
	}

	float halfChord = sqrt(halfChord2);
	vec2 chord = vec2(closest - halfChord, closest + halfChord);

	if (data.w == 2.0) {
		chord = volConeChord(data.xyz, direction.xyz, direction.w, range, chord);
	}

	return chord;
}

// Returns the number of samples taken over the given chord of a light: at least "VOL_LIGHT_STEPS" across the
// diameter of the light, and at least the density the directional lights are marched with, so a light covering
// most of the view ray is never sampled more coarsely than by a march of the whole ray.
int volLocalSampleCount(float chordLength, float range, float rayLength) {
	float count = max(float(VOL_LIGHT_STEPS) * chordLength / (2.0 * range), float(VOL_STEPS) * chordLength / rayLength);
	return clamp(int(ceil(count)), 2, VOL_LOCAL_MAX_STEPS);
}

${slots.join("\n")}

#ifdef VOL_CSM
	// A cascade is an orthographic box in the clip space of the light, where the view ray is a straight line
	// "origin + t * direction". The parts of the view ray inside each box are computed once per pixel, so finding
	// the cascade of a sample only costs a few comparisons, and the clip space position of the view ray is only
	// recomputed when the march enters another cascade, which happens a handful of times per ray.
	vec4 volCsmEntries;
	vec4 volCsmExits;
	int volCsmCurrent;
	vec4 volCsmClipOrigin;
	vec4 volCsmClipDirection;

	// Returns the part of the view ray inside the box of a cascade, keeping the same 2% margin on its sides as
	// the lookup: a point outside every cascade must stay lit, exactly like the material path does past the
	// last cascade, and falling back on another cascade would sample its clamped border texel.
	vec2 volCsmBoxInterval(vec4 origin, vec4 direction) {
		#ifdef VOL_NDC_HALF_Z
			vec3 boxMin = vec3(-0.96, -0.96, 0.0);
		#else
			vec3 boxMin = vec3(-0.96, -0.96, -1.0);
		#endif
		vec3 boxMax = vec3(0.96, 0.96, 1.0);

		// A direction parallel to an axis gives huge bounds of the same sign when the ray is outside of the slab,
		// and huge bounds of opposite signs when it is inside, which is exactly what the slab test expects.
		vec3 safeDirection = mix(vec3(1e-9), direction.xyz, greaterThan(abs(direction.xyz), vec3(1e-9)));
		vec3 inverseDirection = 1.0 / safeDirection;
		vec3 t0 = (boxMin - origin.xyz) * inverseDirection;
		vec3 t1 = (boxMax - origin.xyz) * inverseDirection;
		vec3 tMin = min(t0, t1);
		vec3 tMax = max(t0, t1);

		return vec2(max(max(tMin.x, tMin.y), tMin.z), min(min(tMax.x, tMax.y), tMax.z));
	}

	void volPrepareCsm() {
		volCsmEntries = vec4(1e30);
		volCsmExits = vec4(-1e30);

		for (int cascade = 0; cascade < VOL_CSM_CASCADES; ++cascade) {
			vec2 interval = volCsmBoxInterval(volCsmMatrices[cascade] * vec4(volCameraPosition, 1.0), volCsmMatrices[cascade] * vec4(volRayDir, 0.0));
			volCsmEntries[cascade] = interval.x;
			volCsmExits[cascade] = interval.y;
		}

		volCsmCurrent = -1;
	}

	// Returns the shadowing of the point of the view ray at the distance "t" from the camera.
	float volCsmShadow(float t) {
		// The first cascade containing the sample is the most detailed one.
		int cascade = -1;
		for (int i = VOL_CSM_CASCADES - 1; i >= 0; --i) {
			if (t >= volCsmEntries[i] && t <= volCsmExits[i]) {
				cascade = i;
			}
		}

		if (cascade < 0) {
			return 1.0;
		}

		if (cascade != volCsmCurrent) {
			volCsmCurrent = cascade;
			volCsmClipOrigin = volCsmMatrices[cascade] * vec4(volCameraPosition, 1.0);
			volCsmClipDirection = volCsmMatrices[cascade] * vec4(volRayDir, 0.0);
		}

		// The projection of a directional light is orthographic, "w" is always 1.
		vec4 clip = volCsmClipOrigin + volCsmClipDirection * t;
		vec3 clipSpace = clip.xyz;

		#if VOL_CSM_KIND == 1
			vec3 uvDepth = vec3(0.5 * clipSpace + vec3(0.5));
			#ifdef VOL_NDC_HALF_Z
				uvDepth.z = clipSpace.z;
			#endif

			float shadow = texture2D(volCsmSampler, vec4(uvDepth.x, uvDepth.y, float(cascade), uvDepth.z));
			return volFallOff(mix(volCsmInfo.x, 1.0, shadow), clipSpace.xy, volCsmLightFalloff.z);
		#else
			vec2 uv = 0.5 * clipSpace.xy + vec2(0.5);
			float depthMetric = clamp(volDepthMetric(clip, volCsmInfo.zw), 0.0, 1.0);

			#ifdef VOL_CSM_PACKED
				float shadowMapSample = volUnpack(texture2D(volCsmSampler, vec3(uv, float(cascade))));
			#else
				float shadowMapSample = texture2D(volCsmSampler, vec3(uv, float(cascade))).x;
			#endif

			return depthMetric > shadowMapSample ? volFallOff(volCsmInfo.x, clipSpace.xy, volCsmLightFalloff.z) : 1.0;
		#endif
	}
#endif

#if VOL_GLOBAL_LIGHT_COUNT > 0
	// Marches the whole view ray for the lights that reach all of it: the directional lights. Returns the
	// in-scattered radiance in "rgb" and the number of lights evaluated in "a".
	vec4 volMarchGlobalLights(float tStart, float tEnd) {
		#if VOL_DIRECTIONAL_LIGHT_COUNT > 0
			#ifdef VOL_SCREEN_SHADOWS
				// The occlusion search of a directional light always walks the same direction over the same distance,
				// only its starting point moves along the view ray.
				vec4 directionClip[VOL_DIRECTIONAL_LIGHT_COUNT];
				float directionDepth[VOL_DIRECTIONAL_LIGHT_COUNT];

				for (int li = 0; li < VOL_DIRECTIONAL_LIGHT_COUNT; ++li) {
					vec3 traced = volLightData[li].xyz * volScreenShadowParams.x;
					directionClip[li] = volViewProjection * vec4(traced, 0.0);
					directionDepth[li] = dot(traced, volCameraForward);
				}
			#endif
		#endif

		#if VOL_DISTRIBUTION == 1
			float ratio = pow(tEnd / tStart, 1.0 / float(VOL_STEPS));
		#else
			float uniformStep = (tEnd - tStart) / float(VOL_STEPS);
		#endif

		vec3 result = vec3(0.0);
		float evaluatedLights = 0.0;
		float segmentStart = tStart;

		for (int i = 0; i < VOL_STEPS; ++i) {
			#if VOL_DISTRIBUTION == 1
				float segmentEnd = segmentStart * ratio;
			#else
				float segmentEnd = segmentStart + uniformStep;
			#endif

			float segmentBegin = segmentStart;
			float dt = segmentEnd - segmentBegin;

			// The jitter picks the sample inside its own segment, so the marched interval stays exactly
			// [tStart, tEnd]. Shifting the whole sequence instead would scale the length of the integrated
			// path by the jitter and turn the dithering into multiplicative noise.
			float t = segmentBegin + dt * volJitter;
			segmentStart = segmentEnd;

			vec3 position = volRayDir * t;
			float sigmaT = volExtinctionAt(volCameraPosition.y + position.y, t);

			if (sigmaT <= 1e-6) {
				continue;
			}

			// The transmittance at the START of the segment: the factor below accounts for the extinction
			// across the segment itself.
			float viewTransmittance = volTransmittance(segmentBegin);
			if (viewTransmittance < 0.003) {
				break;
			}

			vec3 scattering = vec3(0.0);
			float stepLights = 0.0;

${globalSlotContributions.join("")}
			#ifdef VOL_CSM
			{
				scattering += volEvalDirectionalLight(volCsmLightData, volCsmLightDiffuse) * mix(1.0, volCsmShadow(t), volCsmLightFalloff.w);
				stepLights += 1.0;
			}
			#endif

			#if VOL_DIRECTIONAL_LIGHT_COUNT > 0
				for (int li = 0; li < VOL_DIRECTIONAL_LIGHT_COUNT; ++li) {
					vec3 contribution = volEvalDirectionalLight(volLightData[li], volLightDiffuse[li]);

					#ifdef VOL_SCREEN_SHADOWS
						// "volLightFalloff[li].z" carries whether this light asked to be occluded by the geometry.
						if (volLightFalloff[li].z > 0.5) {
							contribution *= volScreenShadow(volClipOrigin + volClipDirection * t, directionClip[li], t * volCosForward, directionDepth[li]);
						}
					#endif

					scattering += contribution;
					stepLights += 1.0;
				}
			#endif

			evaluatedLights = max(evaluatedLights, stepLights);

			// Analytic integral of the in-scattering over the segment, "sigma" times "(1 - e^(-sigma * dt)) / sigma".
			// This is what makes the result independent from the number of steps instead of merely converging to it.
			result += scattering * (viewTransmittance * (1.0 - exp(-sigmaT * dt)));
		}

		return vec4(result, evaluatedLights);
	}
#endif

#if VOL_LOCAL_ARRAY_LIGHTS == 1
	// Integrates a point or a spot light of the arrays over the part of the view ray crossing its volume.
	// Returns the in-scattered radiance in "rgb" and whether the light was evaluated in "a".
	vec4 volIntegrateArrayLight(int index, float tStart, float tEnd) {
		vec4 data = volLightData[index];
		vec4 direction = volLightDirection[index];
		vec4 falloff = volLightFalloff[index];

		vec2 chord = volLightChord(data, direction, falloff.x);
		float t0 = max(chord.x, tStart);
		float t1 = min(chord.y, tEnd);

		if (t1 <= t0) {
			return vec4(0.0);
		}

		vec4 diffuse = volLightDiffuse[index];

		#ifdef VOL_SCREEN_SHADOWS
			// "falloff.z" carries whether this light asked to be occluded by the geometry.
			bool occluded = falloff.z > 0.5;
			vec4 lightClip = volClipOrigin + volViewProjection * vec4(data.xyz, 0.0);
			float lightDepth = dot(data.xyz, volCameraForward);
		#endif

		${buildLocalLightIntegration("float(index)", `#ifdef VOL_SCREEN_SHADOWS
					if (occluded) {
						contribution *= volScreenShadowToLight(t, lightClip, lightDepth, distanceToLight);
					}
				#endif`)}
	}
#endif

void main(void) {
	// Nothing to draw this frame: no light reaches the view and the medium neither glows nor attenuates anything.
	if (volPassParams.x > 0.5) {
		gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
		return;
	}

	// Reconstruct the world space direction of the view ray from the UV of the pixel.
	vec4 farPoint = volInverseViewProjection * vec4(vUV * 2.0 - 1.0, 1.0, 1.0);
	volRayDir = normalize(farPoint.xyz / farPoint.w - volCameraPosition);

	// The depth map stores the distance along the view axis, the ray is not aligned with it.
	volCosForward = max(dot(volRayDir, volCameraForward), 1e-4);

	ivec2 depthSize = textureSize(textureSampler, 0);
	float viewZ = volReadLinearDepth(textureSampler, volScatterToDepthTexel(ivec2(gl_FragCoord.xy), depthSize));

	float tEnd = min(viewZ / volCosForward, volParams.x);
	float tStart = max(volCameraMinMaxZ.x / volCosForward, 1e-3);

	if (tEnd <= tStart) {
		gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
		return;
	}

	// Offsets the samples inside their segments to trade the banding produced by a low sample count for noise.
	volNoise = 0.0;
	#if VOL_DITHER == 1
		volNoise = volBayer4(gl_FragCoord.xy);
	#elif VOL_DITHER == 2
		vec2 ditherPosition = gl_FragCoord.xy;
		#ifdef VOL_TEMPORAL_JITTER
			ditherPosition += volFrameIndex * 5.588238;
		#endif
		volNoise = volInterleavedGradientNoise(ditherPosition);
	#endif

	#ifdef VOL_TEMPORAL_ACCUMULATION
		// Each pixel walks the golden ratio sequence from the offset of its dithering pattern, one step per frame:
		// the samples of consecutive frames spread evenly over their segments, and the accumulation averages them.
		// The pattern of the pixels around stays the same, which is what lets the accumulation tell its noise from
		// the changes of the scene.
		volNoise = fract(volNoise + volTemporalOffset);
	#endif
	volJitter = volNoise * volParams.y;

	#ifdef VOL_SCREEN_SHADOWS
		volDepthSize = depthSize;
		volClipOrigin = volViewProjection * vec4(volCameraPosition, 1.0);
		volClipDirection = volViewProjection * vec4(volRayDir, 0.0);
	#endif

	#if VOL_TRANSMITTANCE == 2
		volBuildOpticalDepths(tStart, tEnd);
	#endif

	#ifdef VOL_CSM
		volPrepareCsm();
	#endif

	float evaluatedLights = 0.0;

	// The in-scattering of the constant ambient light has a closed form whatever the medium: the extinction is
	// the derivative of the optical depth, so the integral of "sigma * T" along the ray is "T(start) - T(end)".
	vec3 accumulated = volAmbient * (volTransmittance(tStart) - volTransmittance(tEnd));
	vec4 lightResult = vec4(0.0);

	#if VOL_GLOBAL_LIGHT_COUNT > 0
		lightResult = volMarchGlobalLights(tStart, tEnd);
		accumulated += lightResult.rgb;
		evaluatedLights += lightResult.a;
	#endif

${localSlotContributions.join("")}

	#if VOL_LOCAL_ARRAY_LIGHTS == 1
		int localEnd = VOL_DIRECTIONAL_LIGHT_COUNT + int(volParams.w + 0.5);

		for (int i = VOL_DIRECTIONAL_LIGHT_COUNT; i < VOL_MAX_ARRAY_LIGHTS; ++i) {
			if (i >= localEnd) {
				break;
			}

			lightResult = volIntegrateArrayLight(i, tStart, tEnd);
			accumulated += lightResult.rgb;
			evaluatedLights += lightResult.a;
		}
	#endif

	// The scattering coefficient is a fraction of the extinction, which guarantees energy conservation.
	vec3 result = accumulated * volMedium.x * volFogColor;
	float finalTransmittance = volTransmittance(tEnd);

	#if VOL_DEBUG == 3
		// From blue for no light to red for 16 lights or more evaluated by the pixel.
		float ratioOfBudget = clamp(evaluatedLights / 16.0, 0.0, 1.0);
		result = vec3(ratioOfBudget, 1.0 - abs(ratioOfBudget * 2.0 - 1.0), 1.0 - ratioOfBudget);
	#endif

	#ifdef VOL_LDR_ENCODE
		result = result / (1.0 + result);
	#endif

	gl_FragColor = vec4(result, finalTransmittance);
}
`
  );
}
__name(buildVolumetricLightingScatteringShader, "buildVolumetricLightingScatteringShader");
function buildVolumetricLightingTemporalShader() {
  return (
    /* glsl */
    `precision highp float;
precision highp int;

varying vec2 vUV;

// Scattering computed this frame, and scattering accumulated over the previous frames, both at the resolution of
// the scattering buffer.
uniform sampler2D textureSampler;
uniform sampler2D volHistorySampler;

// Full resolution linear depth of the scene, written by the linear depth pass.
uniform highp sampler2D volLinearDepthSampler;

uniform vec2 volCameraMinMaxZ;
uniform vec2 volDepthRatio;
uniform mat4 volInverseViewProjection;
uniform vec3 volCameraPosition;
uniform vec3 volCameraForward;

// View projection matrix of the previous frame, applied to positions relative to the current camera.
uniform mat4 volPreviousViewProjection;

// (weight of the current frame, width of the clipping of the history in standard deviations, maximum distance of
// the march, 1 when the history holds the previous frame, 2 when the previous frame had nothing to draw)
uniform vec4 volTemporalParams;

// (distance the camera moved since the previous frame, part of the medium along the view ray whose change the
// delay of the history may lag behind)
uniform vec2 volTemporalMotion;

${packingHelpers2}
${linearDepthHelpers}

void main(void) {
	ivec2 texel = ivec2(gl_FragCoord.xy);
	ivec2 size = textureSize(textureSampler, 0);

	// Bounded so a light next to the camera, which a half float can't hold, never turns the history infinite.
	vec4 current = min(texelFetch(textureSampler, texel, 0), vec4(65000.0));

	if (volTemporalParams.w < 0.5) {
		gl_FragColor = current;
		return;
	}

	// The end of the marched part of the view ray is reprojected in the previous frame: the medium in front of it
	// is spread along the ray, but its scattering varies slowly enough for the surface behind it, or the maximum
	// distance of the march, to be a faithful anchor.
	ivec2 depthSize = textureSize(volLinearDepthSampler, 0);
	float viewZ = volReadLinearDepth(volLinearDepthSampler, volScatterToDepthTexel(texel, depthSize));

	vec4 farPoint = volInverseViewProjection * vec4(vUV * 2.0 - 1.0, 1.0, 1.0);
	vec3 rayDir = normalize(farPoint.xyz / farPoint.w - volCameraPosition);
	float t = min(viewZ / max(dot(rayDir, volCameraForward), 1e-4), volTemporalParams.z);

	vec4 previousClip = volPreviousViewProjection * vec4(rayDir * t, 1.0);
	vec2 previousUV = (previousClip.xy / previousClip.w) * 0.5 + 0.5;

	if (previousClip.w <= 0.0 || previousUV.x < 0.0 || previousUV.x > 1.0 || previousUV.y < 0.0 || previousUV.y > 1.0) {
		gl_FragColor = current;
		return;
	}

	// The pipeline had nothing to draw the previous frame: no light at all, seen through the same medium.
	vec4 history = volTemporalParams.w > 1.5 ? vec4(0.0, 0.0, 0.0, current.a) : texture2D(volHistorySampler, previousUV);

	// A history holding an infinity or a NaN would never recover from it.
	if (!all(lessThan(abs(history), vec4(1e20)))) {
		gl_FragColor = current;
		return;
	}

	// Variance clipping: the history is kept within what the current frame shows around the pixel.
	vec4 m1 = vec4(0.0);
	vec4 m2 = vec4(0.0);

	for (int y = -1; y <= 1; ++y) {
		for (int x = -1; x <= 1; ++x) {
			vec4 c = min(texelFetch(textureSampler, clamp(texel + ivec2(x, y), ivec2(0), size - 1), 0), vec4(65000.0));
			m1 += c;
			m2 += c * c;
		}
	}

	vec4 mean = m1 * (1.0 / 9.0);
	vec4 sigma = sqrt(max(m2 * (1.0 / 9.0) - mean * mean, vec4(0.0)));
	vec4 clipped = clamp(history, mean - volTemporalParams.y * sigma, mean + volTemporalParams.y * sigma);

	// The history holds the medium as seen from where the camera was. A rotation of the camera changes nothing to
	// what a view ray crosses, but moving it changes the medium along the view ray by about the distance it moved
	// relative to the length of the ray: the weight of the current frame grows with that change, so the delay of
	// the history never lags behind more than the given part of it.
	float motion = volTemporalMotion.x / max(t, 1e-3);
	float factor = max(volTemporalParams.x, motion / (motion + volTemporalMotion.y));

	// The transmittance only depends on the length of medium in front of the surface: when it changed, the history
	// shows another surface and is dropped. Compared before the clipping, which would hide the change.
	float transmittanceChange = abs(history.a - current.a) / max(max(history.a, current.a), 1e-3);
	float historyWeight = (1.0 - factor) * (1.0 - smoothstep(0.02, 0.15, transmittanceChange));

	gl_FragColor = mix(current, clipped, historyWeight);
}
`
  );
}
__name(buildVolumetricLightingTemporalShader, "buildVolumetricLightingTemporalShader");
function buildVolumetricLightingBlurShader() {
  return (
    /* glsl */
    `precision highp float;
precision highp int;

varying vec2 vUV;

uniform sampler2D textureSampler;
uniform highp sampler2D volLinearDepthSampler;

uniform vec2 volCameraMinMaxZ;
uniform vec2 volDepthRatio;
uniform vec2 volBlurDirection;
uniform vec2 volBlurParams;

// (1 when the pipeline has nothing to draw this frame, unused, unused, unused)
uniform vec4 volPassParams;

${packingHelpers2}
${linearDepthHelpers}

void main(void) {
	// Nothing to draw this frame: the composition doesn't read the scattering buffer.
	if (volPassParams.x > 0.5) {
		gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
		return;
	}

	// The blur runs at the resolution of the scattering buffer and every tap is an exact texel, compared using
	// the depth the raymarching used for it: no filtering is needed, no depth has to be unpacked nor linearized.
	ivec2 size = textureSize(textureSampler, 0);
	ivec2 depthSize = textureSize(volLinearDepthSampler, 0);
	ivec2 center = ivec2(gl_FragCoord.xy);
	ivec2 direction = ivec2(volBlurDirection);

	float centerDepth = volReadLinearDepth(volLinearDepthSampler, volScatterToDepthTexel(center, depthSize));
	float inverseDepthThreshold = 1.0 / max(volBlurParams.y * max(centerDepth, volCameraMinMaxZ.x), 1e-4);
	float sigma = max(volBlurParams.x, 1e-4);
	float inverseTwoSigma2 = 1.0 / (2.0 * sigma * sigma);

	vec4 result = texelFetch(textureSampler, center, 0);
	float totalWeight = 1.0;

	for (int i = 1; i <= VOL_BLUR_RADIUS; ++i) {
		float spatialWeight = exp(-float(i * i) * inverseTwoSigma2);

		ivec2 positive = center + direction * i;
		ivec2 negative = center - direction * i;

		if (positive.x < size.x && positive.y < size.y) {
			float weight = spatialWeight * exp(-abs(volReadLinearDepth(volLinearDepthSampler, volScatterToDepthTexel(positive, depthSize)) - centerDepth) * inverseDepthThreshold);
			result += texelFetch(textureSampler, positive, 0) * weight;
			totalWeight += weight;
		}

		if (negative.x >= 0 && negative.y >= 0) {
			float weight = spatialWeight * exp(-abs(volReadLinearDepth(volLinearDepthSampler, volScatterToDepthTexel(negative, depthSize)) - centerDepth) * inverseDepthThreshold);
			result += texelFetch(textureSampler, negative, 0) * weight;
			totalWeight += weight;
		}
	}

	gl_FragColor = result / totalWeight;
}
`
  );
}
__name(buildVolumetricLightingBlurShader, "buildVolumetricLightingBlurShader");
function buildVolumetricLightingComposeShader() {
  return (
    /* glsl */
    `precision highp float;
precision highp int;

varying vec2 vUV;

uniform sampler2D textureSampler;
uniform sampler2D volSceneSampler;
uniform highp sampler2D volLinearDepthSampler;

uniform vec2 volCameraMinMaxZ;
uniform vec2 volDepthRatio;
uniform vec4 volComposeParams;

// (1 when the pipeline has nothing to draw this frame, unused, unused, unused)
uniform vec4 volPassParams;

${packingHelpers2}
${linearDepthHelpers}

float volBayer8(vec2 p) {
	vec2 p1 = mod(floor(p), 2.0);
	vec2 p2 = mod(floor(p * 0.5), 2.0);
	vec2 p3 = mod(floor(p * 0.25), 2.0);

	float b1 = 2.0 * p1.x + 3.0 * p1.y - 4.0 * p1.x * p1.y;
	float b2 = 2.0 * p2.x + 3.0 * p2.y - 4.0 * p2.x * p2.y;
	float b3 = 2.0 * p3.x + 3.0 * p3.y - 4.0 * p3.x * p3.y;

	return (b1 * 16.0 + b2 * 4.0 + b3) / 64.0;
}

// Nearest depth upsampling: the four low resolution taps around the pixel are weighted by both their
// bilinear weight and how close the depth the raymarching used for them is to the depth of the pixel.
vec4 volUpsample(float centerDepth, ivec2 depthSize) {
	ivec2 size = textureSize(textureSampler, 0);
	vec2 texelCoordinate = vUV * vec2(size) - 0.5;
	vec2 baseCoordinate = floor(texelCoordinate);
	vec2 fraction = texelCoordinate - baseCoordinate;

	ivec2 base = ivec2(baseCoordinate);
	ivec2 maximum = size - 1;

	float inverseDepthThreshold = 1.0 / max(volComposeParams.z * max(centerDepth, volCameraMinMaxZ.x), 1e-4);

	vec4 result = vec4(0.0);
	float totalWeight = 0.0;

	vec4 nearestSample = vec4(0.0);
	float nearestDistance = 1e20;

	for (int y = 0; y < 2; ++y) {
		for (int x = 0; x < 2; ++x) {
			ivec2 coordinates = clamp(base + ivec2(x, y), ivec2(0), maximum);

			float bilinearWeight = (x == 0 ? 1.0 - fraction.x : fraction.x) * (y == 0 ? 1.0 - fraction.y : fraction.y);
			float depthDistance = abs(volReadLinearDepth(volLinearDepthSampler, volScatterToDepthTexel(coordinates, depthSize)) - centerDepth);

			vec4 tap = texelFetch(textureSampler, coordinates, 0);

			if (depthDistance < nearestDistance) {
				nearestDistance = depthDistance;
				nearestSample = tap;
			}

			float weight = bilinearWeight / (1e-4 + depthDistance * inverseDepthThreshold);
			result += tap * weight;
			totalWeight += weight;
		}
	}

	// Every tap sits on the other side of a silhouette, fall back to the closest one instead of averaging.
	return totalWeight > 1e-4 ? result / totalWeight : nearestSample;
}

void main(void) {
	// Nothing to draw this frame: the color of the scene passes through, exactly as it would under light shafts of
	// zero intensity.
	if (volPassParams.x > 0.5) {
		gl_FragColor = vec4(texture2D(volSceneSampler, vUV).rgb + (volBayer8(gl_FragCoord.xy) - 0.5) * volComposeParams.w, 1.0);
		return;
	}

	// The linear depth has the full resolution of the canvas: same texel the depth map would give with a nearest filter.
	ivec2 depthSize = textureSize(volLinearDepthSampler, 0);
	float centerDepth = volReadLinearDepth(volLinearDepthSampler, min(ivec2(vUV * vec2(depthSize)), depthSize - 1));

	vec4 volumetric = volUpsample(centerDepth, depthSize);

	#ifdef VOL_LDR_ENCODE
		volumetric.rgb = volumetric.rgb / max(vec3(1e-4), 1.0 - volumetric.rgb);
	#endif

	#if VOL_DEBUG == 1 || VOL_DEBUG == 3
		gl_FragColor = vec4(volumetric.rgb * volComposeParams.x, 1.0);
		return;
	#elif VOL_DEBUG == 2
		gl_FragColor = vec4(vec3(volumetric.a), 1.0);
		return;
	#endif

	vec3 sceneColor = texture2D(volSceneSampler, vUV).rgb;

	// The materials of the scene already attenuated their color with the fog, so this is left at 0 by
	// default and only becomes useful when the medium is driven by the pipeline instead of the scene fog.
	sceneColor *= mix(1.0, volumetric.a, volComposeParams.y);

	vec3 result = sceneColor + volumetric.rgb * volComposeParams.x;

	// Breaks up the banding an 8 bits output would otherwise show on the smooth gradients of the shafts.
	result += (volBayer8(gl_FragCoord.xy) - 0.5) * volComposeParams.w;

	gl_FragColor = vec4(result, 1.0);
}
`
  );
}
__name(buildVolumetricLightingComposeShader, "buildVolumetricLightingComposeShader");
var registered = {};
function registerVolumetricLightingShaders(shaderLanguage) {
  if (registered[shaderLanguage]) {
    return;
  }
  registered[shaderLanguage] = true;
  if (shaderLanguage === import_babylonjs21.ShaderLanguage.WGSL) {
    const shaders = getVolumetricLightingShadersWGSL();
    import_babylonjs20.ShaderStore.ShadersStoreWGSL[`${volumetricLightingLinearDepthShaderName}PixelShader`] = shaders.linearDepth;
    import_babylonjs20.ShaderStore.ShadersStoreWGSL[`${volumetricLightingScatteringShaderName}PixelShader`] = shaders.scattering;
    import_babylonjs20.ShaderStore.ShadersStoreWGSL[`${volumetricLightingTemporalShaderName}PixelShader`] = shaders.temporal;
    import_babylonjs20.ShaderStore.ShadersStoreWGSL[`${volumetricLightingBlurShaderName}PixelShader`] = shaders.blur;
    import_babylonjs20.ShaderStore.ShadersStoreWGSL[`${volumetricLightingComposeShaderName}PixelShader`] = shaders.compose;
    return;
  }
  import_babylonjs20.ShaderStore.ShadersStore[`${volumetricLightingLinearDepthShaderName}PixelShader`] = buildVolumetricLightingLinearDepthShader();
  import_babylonjs20.ShaderStore.ShadersStore[`${volumetricLightingScatteringShaderName}PixelShader`] = buildVolumetricLightingScatteringShader(maxVolumetricShadowSlots);
  import_babylonjs20.ShaderStore.ShadersStore[`${volumetricLightingTemporalShaderName}PixelShader`] = buildVolumetricLightingTemporalShader();
  import_babylonjs20.ShaderStore.ShadersStore[`${volumetricLightingBlurShaderName}PixelShader`] = buildVolumetricLightingBlurShader();
  import_babylonjs20.ShaderStore.ShadersStore[`${volumetricLightingComposeShaderName}PixelShader`] = buildVolumetricLightingComposeShader();
}
__name(registerVolumetricLightingShaders, "registerVolumetricLightingShaders");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/rendering/volumetric/pipeline.js
var leftHandedForward = new import_babylonjs25.Vector3(0, 0, 1);
var rightHandedForward = new import_babylonjs25.Vector3(0, 0, -1);
var depthWarmupMeshesPerFrame = 32;
var depthRendererKeyPrefix = "volumetricLighting_";
var structuralConfigurationKeys = ["resolutionScale", "blurPasses", "temporalAccumulation"];
var temporalClippingWidth = 1;
var temporalMotionTolerance = 0.05;
var goldenRatioConjugate = 0.6180339887498949;
var transmittanceSamples = 32;
var scatteringUniforms = [
  "volInverseViewProjection",
  "volViewProjection",
  "volCameraPosition",
  "volCameraForward",
  "volCameraMinMaxZ",
  "volDepthRatio",
  "volFrameIndex",
  "volTemporalOffset",
  "volFogInfos",
  "volFogColor",
  "volLinearFogEps",
  "volMedium",
  "volScreenShadowParams",
  "volAmbient",
  "volParams",
  "volPassParams",
  "volLightData",
  "volLightDiffuse",
  "volLightDirection",
  "volLightFalloff",
  "volShadowLightData",
  "volShadowLightDiffuse",
  "volShadowLightDirection",
  "volShadowLightFalloff",
  "volShadowInfo",
  "volShadowMatrix",
  "volCsmLightData",
  "volCsmLightDiffuse",
  "volCsmLightDirection",
  "volCsmLightFalloff",
  "volCsmInfo",
  "volCsmMatrices"
];
var scatteringSamplers = ["volCsmSampler"];
for (let i = 0; i < maxVolumetricShadowSlots; ++i) {
  scatteringSamplers.push(`volShadowSampler${i}`);
}
var temporalUniforms = [
  "volCameraMinMaxZ",
  "volDepthRatio",
  "volInverseViewProjection",
  "volCameraPosition",
  "volCameraForward",
  "volPreviousViewProjection",
  "volTemporalParams",
  "volTemporalMotion"
];
var VolumetricLightingRenderingPipeline = class _VolumetricLightingRenderingPipeline extends import_babylonjs31.PostProcessRenderPipeline {
  static {
    __name(this, "VolumetricLightingRenderingPipeline");
  }
  /**
   * Defines the name of the render effect keeping the color of the scene and extracting its linear depth.
   */
  static SceneColorEffectName = "VolumetricLightingSceneColorEffect";
  /**
   * Defines the name of the render effect raymarching the participating medium.
   */
  static ScatteringEffectName = "VolumetricLightingScatteringEffect";
  /**
   * Defines the name of the render effect accumulating the result of the raymarching over the frames.
   */
  static TemporalEffectName = "VolumetricLightingTemporalEffect";
  /**
   * Defines the name of the render effect denoising the result of the raymarching.
   */
  static BlurEffectName = "VolumetricLightingBlurEffect";
  /**
   * Defines the name of the render effect composing the light shafts over the color of the scene.
   */
  static ComposeEffectName = "VolumetricLightingComposeEffect";
  /**
   * Returns the distance at which the medium becomes fully opaque to use as a default for the linear mode.
   * @param scene defines the reference to the scene to measure.
   * @param camera defines the reference to the camera, used when the scene has no geometry yet.
   */
  static GetDefaultFogEnd(scene, camera) {
    return 1 / _VolumetricLightingRenderingPipeline.GetDefaultFogDensity(scene, camera);
  }
  /**
   * Returns the extinction coefficient to use as a default for the medium of the pipeline.
   *
   * There is no unit agnostic constant that works here: an extinction of 1 per unit is a thick smoke in a
   * scene authored in metres and a vacuum in one authored in centimetres. Deriving it from the size of the
   * scene gives an optical depth of about 1 from one end of the content to the other, which reads well
   * whatever the project is authored in.
   * @param scene defines the reference to the scene to measure.
   * @param camera defines the reference to the camera, used when the scene has no geometry yet.
   */
  static GetDefaultFogDensity(scene, camera) {
    let size = 0;
    if (scene.meshes.length) {
      const extends_ = scene.getWorldExtends();
      const diagonal = extends_.max.subtract(extends_.min).length();
      if (isFinite(diagonal)) {
        size = diagonal;
      }
    }
    if (size < 1e-3) {
      size = Math.max(camera.globalPosition.length(), camera.maxZ * 1e-3, 1);
    }
    return Math.min(1, Math.max(1e-5, 1 / Math.max(1e-3, size)));
  }
  /**
   * Returns wether or not the volumetric lighting rendering pipeline is supported by the given engine.
   * The raymarching shader relies on shadow samplers, texture arrays and texel fetches, which need WebGL 2,
   * and ships as both GLSL and hand written WGSL so WebGPU is supported without an external transpiler.
   * @param engine defines the reference to the engine to check.
   */
  static IsSupported(engine) {
    if (engine.isWebGPU) {
      return true;
    }
    return (engine.webGLVersion ?? 0) >= 2;
  }
  /**
   * Returns the language the shaders of the pipeline must be written in for the given engine.
   * @param engine defines the reference to the engine to check.
   */
  static GetShaderLanguage(engine) {
    return engine.isWebGPU ? import_babylonjs29.ShaderLanguage.WGSL : import_babylonjs29.ShaderLanguage.GLSL;
  }
  _scene;
  _camera;
  _configuration;
  _configurationProxy;
  _textureType;
  _shaderLanguage;
  _ldrEncode;
  _linearDepthType;
  _linearDepthPacked;
  _msaaSamples = 1;
  _msaaSamplesAssigned = false;
  _depthSource = VolumetricDepthSource.DepthRenderer;
  _depthRenderer = null;
  _ownsDepthRenderer = false;
  _depthMapRenderedWithCamera = false;
  _depthMode = 0;
  _prePassConfiguration = createVolumetricLightingPrePassConfiguration();
  _linearDepthPostProcess = null;
  _scatteringPostProcess = null;
  _temporalPostProcess = null;
  _blurPostProcesses = [];
  _composePostProcess = null;
  _temporalSamplesDivider = volumetricTemporalSamplesDivider;
  _temporalClippingWidth = temporalClippingWidth;
  _temporalMotionTolerance = temporalMotionTolerance;
  _previousCameraPosition = new import_babylonjs25.Vector3();
  _historyTextures = [null, null];
  _historyFrames = [-1, -1];
  _historyEmpty = [false, false];
  _historyIndex = 0;
  _temporalFrame = 0;
  _previousViewProjection = import_babylonjs25.Matrix.Identity();
  _previousViewProjectionRelative = import_babylonjs25.Matrix.Identity();
  _cameraTranslation = import_babylonjs25.Matrix.Identity();
  _selection = null;
  _budget;
  _linearDepthDefines = "";
  _scatteringDefines = "";
  _temporalDefines = "";
  _blurDefines = "";
  _composeDefines = "";
  _frameCount = 0;
  _lightsDirty = true;
  _disposed = false;
  _idle = false;
  _depthWarmup = /* @__PURE__ */ new Set();
  _beforeCameraRenderObserver = null;
  _afterCameraRenderObserver = null;
  _lightAddedObserver = null;
  _lightRemovedObserver = null;
  _meshAddedObserver = null;
  _meshRemovedObserver = null;
  _inverseViewProjection = import_babylonjs25.Matrix.Identity();
  _temporaryVector = new import_babylonjs25.Vector3();
  _temporaryColor = new import_babylonjs23.Color3();
  _lightData = new Float32Array(maxVolumetricArrayLights * 4);
  _lightDiffuse = new Float32Array(maxVolumetricArrayLights * 4);
  _lightDirection = new Float32Array(maxVolumetricArrayLights * 4);
  _lightFalloff = new Float32Array(maxVolumetricArrayLights * 4);
  _shadowLightData = new Float32Array(maxVolumetricShadowSlots * 4);
  _shadowLightDiffuse = new Float32Array(maxVolumetricShadowSlots * 4);
  _shadowLightDirection = new Float32Array(maxVolumetricShadowSlots * 4);
  _shadowLightFalloff = new Float32Array(maxVolumetricShadowSlots * 4);
  _shadowInfo = new Float32Array(maxVolumetricShadowSlots * 4);
  _shadowMatrices = new Float32Array(maxVolumetricShadowSlots * 16);
  _csmLightData = new Float32Array(4);
  _csmLightDiffuse = new Float32Array(4);
  _csmLightDirection = new Float32Array(4);
  _csmLightFalloff = new Float32Array(4);
  _csmMatrices = new Float32Array(4 * 16);
  /**
   * Constructor.
   * @param name defines the name of the pipeline.
   * @param scene defines the reference to the scene the pipeline belongs to.
   * @param camera defines the reference to the camera the pipeline is attached to.
   * @param configuration defines the optional configuration to apply on the pipeline.
   */
  constructor(name, scene, camera, configuration2) {
    super(scene.getEngine(), name);
    this._shaderLanguage = _VolumetricLightingRenderingPipeline.GetShaderLanguage(scene.getEngine());
    registerVolumetricLightingShaders(this._shaderLanguage);
    this._scene = scene;
    this._camera = camera;
    this._configuration = normalizeVolumetricLightingConfiguration({
      ...getDefaultVolumetricLightingConfiguration(),
      fogDensity: configuration2?.fogDensity ?? _VolumetricLightingRenderingPipeline.GetDefaultFogDensity(scene, camera),
      fogEnd: configuration2?.fogEnd ?? _VolumetricLightingRenderingPipeline.GetDefaultFogEnd(scene, camera),
      screenSpaceShadowMaxDistance: configuration2?.screenSpaceShadowMaxDistance ?? _VolumetricLightingRenderingPipeline.GetDefaultFogEnd(scene, camera),
      ...configuration2
    });
    this._configurationProxy = new Proxy(this._configuration, {
      set: /* @__PURE__ */ __name((target, property, value) => {
        const key = property;
        if (target[key] === value) {
          return true;
        }
        target[key] = value;
        this._onConfigurationChanged(key);
        return true;
      }, "set")
    });
    const engine = scene.getEngine();
    const caps = engine.getCaps();
    const supportsHalfFloat = caps.textureHalfFloatRender && caps.textureHalfFloatLinearFiltering;
    this._textureType = supportsHalfFloat ? import_babylonjs24.Constants.TEXTURETYPE_HALF_FLOAT : import_babylonjs24.Constants.TEXTURETYPE_UNSIGNED_BYTE;
    this._ldrEncode = !supportsHalfFloat;
    this._linearDepthType = caps.textureHalfFloatRender ? import_babylonjs24.Constants.TEXTURETYPE_HALF_FLOAT : caps.textureFloatRender ? import_babylonjs24.Constants.TEXTURETYPE_FLOAT : import_babylonjs24.Constants.TEXTURETYPE_UNSIGNED_BYTE;
    this._linearDepthPacked = this._linearDepthType === import_babylonjs24.Constants.TEXTURETYPE_UNSIGNED_BYTE;
    this._budget = computeVolumetricBudget(engine, this._configuration);
    this._depthSource = resolveVolumetricDepthSource(scene);
    this._setupDepthSource();
    this._buildRenderEffects();
    scene.postProcessRenderPipelineManager.addPipeline(this);
    scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline(this.name, camera);
    this._beforeCameraRenderObserver = scene.onBeforeCameraRenderObservable.add((renderedCamera) => {
      if (renderedCamera === this._camera) {
        this._updateDepthSource();
        this._updateSelection();
        this._warmUpDepthRenderer();
      }
    });
    this._afterCameraRenderObserver = scene.onAfterCameraRenderObservable.add((renderedCamera) => {
      if (renderedCamera === this._camera) {
        this._setDepthMapRenderedWithCamera(false);
      }
    });
    this._lightAddedObserver = scene.onNewLightAddedObservable.add(() => this.markLightsDirty());
    this._lightRemovedObserver = scene.onLightRemovedObservable.add(() => this.markLightsDirty());
    this._meshAddedObserver = scene.onNewMeshAddedObservable.add((mesh) => {
      if (this._ownsDepthRenderer) {
        this._depthWarmup.add(mesh);
      }
    });
    this._meshRemovedObserver = scene.onMeshRemovedObservable.add((mesh) => this._depthWarmup.delete(mesh));
  }
  /**
   * Gets wether or not the pipeline was disposed. Babylon.js disposes a rendering pipeline on its own when
   * one of its post-processes fails to compile, so this is not always the result of an explicit call.
   */
  get isDisposed() {
    return this._disposed;
  }
  /**
   * Gets the reference to the scene the pipeline belongs to.
   */
  get scene() {
    return this._scene;
  }
  /**
   * Gets the reference to the camera the pipeline is attached to.
   */
  get camera() {
    return this._camera;
  }
  /**
   * Gets the live configuration of the pipeline. Assigning a property of the returned object applies the
   * change immediately, rebuilding the chain of post-processes when the change requires it.
   */
  get configuration() {
    return this._configurationProxy;
  }
  /**
   * Gets wether or not the pipeline had nothing to draw at its last update: no light reaches the view of the camera
   * and the medium neither glows nor attenuates the scene. Its passes then cost next to nothing.
   */
  get isIdle() {
    return this._idle;
  }
  /**
   * Gets where the depth of the scene is currently read from. @see VolumetricDepthSource
   */
  get depthSource() {
    return this._depthSource;
  }
  /**
   * Gets the number of MSAA samples used when the scene is rasterized (default: 1, no MSAA).
   */
  get msaaSamples() {
    return this._msaaSamples;
  }
  /**
   * Sets the number of MSAA samples used when the scene is rasterized. Babylon.js clamps the value to
   * "engine.getCaps().maxMSAASamples", which WebGPU reports as 4 since its specification only allows 1 and 4.
   */
  set msaaSamples(value) {
    this._msaaSamples = value;
    this._msaaSamplesAssigned = true;
    this._applyMsaaSamples();
  }
  /**
   * Gets the statistics of the last selection pass, used by the inspector to explain what each light does.
   */
  getStats() {
    return this._selection?.stats ?? null;
  }
  /**
   * Gets the number of lights the raymarching shader can be compiled for on the current engine.
   */
  getBudget() {
    return this._budget;
  }
  /**
   * Gets a string identifying the name of the class.
   */
  getClassName() {
    return "VolumetricLightingRenderingPipeline";
  }
  /**
   * Marks the list of lights contributing to the effect as dirty, forcing a new selection pass on the
   * next frame. Called when the volumetric configuration of a light is edited in the inspector.
   */
  markLightsDirty() {
    this._lightsDirty = true;
  }
  /**
   * Applies the given configuration on the pipeline.
   * @param data defines the configuration to apply.
   */
  applyConfiguration(data) {
    const normalized = normalizeVolumetricLightingConfiguration({
      ...this._configuration,
      ...data
    });
    const requiresRebuild = structuralConfigurationKeys.some((key) => normalized[key] !== this._configuration[key]);
    Object.assign(this._configuration, normalized);
    this._budget = computeVolumetricBudget(this._scene.getEngine(), this._configuration);
    this._lightsDirty = true;
    if (requiresRebuild) {
      this._rebuildRenderEffects();
    }
  }
  /**
   * Serializes the configuration of the pipeline.
   */
  serializeConfiguration() {
    return {
      ...this._configuration,
      fogColor: this._configuration.fogColor.slice(),
      ambientColor: this._configuration.ambientColor.slice()
    };
  }
  /**
   * Disposes the pipeline and all the resources it owns.
   */
  dispose() {
    if (this._disposed) {
      return;
    }
    this._disposed = true;
    this._scene.onBeforeCameraRenderObservable.remove(this._beforeCameraRenderObserver);
    this._scene.onAfterCameraRenderObservable.remove(this._afterCameraRenderObserver);
    this._scene.onNewLightAddedObservable.remove(this._lightAddedObserver);
    this._scene.onLightRemovedObservable.remove(this._lightRemovedObserver);
    this._scene.onNewMeshAddedObservable.remove(this._meshAddedObserver);
    this._scene.onMeshRemovedObservable.remove(this._meshRemovedObserver);
    this._beforeCameraRenderObserver = null;
    this._afterCameraRenderObserver = null;
    this._lightAddedObserver = null;
    this._lightRemovedObserver = null;
    this._meshAddedObserver = null;
    this._meshRemovedObserver = null;
    const cameras = this._cameras.slice();
    this._scene.postProcessRenderPipelineManager.detachCamerasFromRenderPipeline(this.name, cameras);
    this._disposePostProcesses(cameras);
    this._releaseDepthSource();
    this._selection = null;
    this._scene.postProcessRenderPipelineManager.removePipeline(this.name);
    super.dispose();
  }
  _onConfigurationChanged(key) {
    if (key === "maxLights" || key === "maxShadowedLights") {
      this._budget = computeVolumetricBudget(this._scene.getEngine(), this._configuration);
    }
    this._lightsDirty = true;
    if (structuralConfigurationKeys.includes(key)) {
      this._rebuildRenderEffects();
    }
  }
  /**
   * Prepares the current source of the depth of the scene and detects the format it stores so the shader
   * can be compiled for it.
   */
  _setupDepthSource() {
    switch (this._depthSource) {
      case VolumetricDepthSource.PrePass:
        this._depthMode = 1;
        break;
      case VolumetricDepthSource.GeometryBuffer:
        this._ensureGeometryBufferDepth();
        this._depthMode = 1;
        break;
      default:
        this._setupDepthRenderer();
        break;
    }
    this._applyPrePassConfiguration();
    this._applyMsaaSamples();
  }
  /**
   * Releases what the current source of the depth of the scene owns.
   */
  _releaseDepthSource() {
    if (this._ownsDepthRenderer && this._depthRenderer) {
      this._setDepthMapRenderedWithCamera(false);
      this._depthRenderer.dispose();
    }
    this._depthRenderer = null;
    this._ownsDepthRenderer = false;
    this._depthWarmup.clear();
    if (this._linearDepthPostProcess) {
      this._linearDepthPostProcess._prePassEffectConfiguration = void 0;
    }
  }
  /**
   * Switches to another source of the depth of the scene when the renderers of the scene changed: the
   * effects enabling the prepass renderer can be created after this pipeline, and it can be disabled at any time.
   */
  _updateDepthSource() {
    if (this._disposed) {
      return;
    }
    const depthSource = resolveVolumetricDepthSource(this._scene);
    if (depthSource === this._depthSource) {
      if (depthSource === VolumetricDepthSource.GeometryBuffer) {
        this._ensureGeometryBufferDepth();
      }
      if (depthSource === VolumetricDepthSource.DepthRenderer && this._hasDepthRendererOfCameraChanged()) {
        this._releaseDepthSource();
        this._setupDepthSource();
        this._lightsDirty = true;
      }
      return;
    }
    this._releaseDepthSource();
    this._depthSource = depthSource;
    this._setupDepthSource();
    getVolumetricPrePassRenderer(this._scene)?.markAsDirty();
    this._lightsDirty = true;
  }
  /**
   * Enables the depth texture of the geometry buffer renderer. Toggling it recreates the whole geometry
   * buffer, so it is only done when no other effect already enabled it.
   */
  _ensureGeometryBufferDepth() {
    const geometryBufferRenderer = getVolumetricGeometryBufferRenderer(this._scene);
    if (geometryBufferRenderer && !geometryBufferRenderer.enableDepth) {
      geometryBufferRenderer.enableDepth = true;
    }
  }
  /**
   * Asks the prepass renderer to write the depth of the scene when it is the current source. The prepass
   * renderer collects the configurations of the post-processes attached to the camera when it updates.
   */
  _applyPrePassConfiguration() {
    if (this._linearDepthPostProcess && this._depthSource === VolumetricDepthSource.PrePass) {
      this._linearDepthPostProcess._prePassEffectConfiguration = this._prePassConfiguration;
    }
  }
  /**
   * Applies the MSAA sample count on whatever the scene is rasterized into. Only the very first pass of the
   * chain of the camera receives the geometry of the scene: the passes that follow draw a full screen triangle
   * on which MSAA antialiases nothing while still paying for the samples and their resolve. When the prepass
   * renderer is the source of the depth, the scene is rendered in its multi render target instead, which is
   * then the one to multisample.
   */
  _applyMsaaSamples() {
    if (!this._msaaSamplesAssigned) {
      return;
    }
    if (this._depthSource === VolumetricDepthSource.PrePass) {
      const prePassRenderer = getVolumetricPrePassRenderer(this._scene);
      if (prePassRenderer) {
        prePassRenderer.samples = this._msaaSamples;
        return;
      }
    }
    if (!this._enableMSAAOnFirstPostProcess(this._msaaSamples) && this._msaaSamples > 1) {
      console.warn("Volumetric lighting: MSAA is not supported by the engine, the requested samples are ignored.");
    }
  }
  /**
   * Adopts the depth renderer of the camera when one already exists instead of paying for a second full
   * depth pass, and detects the format it stores so the shader can be compiled for it.
   */
  _setupDepthRenderer() {
    const scene = this._scene;
    const existing = scene._depthRenderer?.[this._camera.uniqueId];
    this._ownsDepthRenderer = !existing;
    if (existing) {
      this._depthRenderer = existing;
    } else {
      const caps = this._scene.getEngine().getCaps();
      const type = caps.textureHalfFloatRender ? import_babylonjs24.Constants.TEXTURETYPE_HALF_FLOAT : caps.textureFloatRender ? import_babylonjs24.Constants.TEXTURETYPE_FLOAT : import_babylonjs24.Constants.TEXTURETYPE_UNSIGNED_BYTE;
      this._depthRenderer = new import_babylonjs27.DepthRenderer(this._scene, type, this._camera, false, import_babylonjs24.Constants.TEXTURE_NEAREST_SAMPLINGMODE, false, "VolumetricLightingDepth");
      this._depthRenderer.enabled = !this._idle;
      scene._depthRenderer ??= {};
      scene._depthRenderer[`${depthRendererKeyPrefix}${this._scene.getUniqueId()}`] = this._depthRenderer;
      this._scene.meshes.forEach((mesh) => this._depthWarmup.add(mesh));
    }
    if (this._depthRenderer.isPacked) {
      this._depthMode = 2;
    } else if (this._depthRenderer.clearColor.r === 0) {
      this._depthMode = 1;
    } else {
      this._depthMode = 0;
    }
  }
  /**
   * Returns wether or not the depth renderer of the camera the scene hands to the effects asking for it changed
   * since the pipeline chose its own: created by another effect, or disabled by the one that created it.
   */
  _hasDepthRendererOfCameraChanged() {
    const registered11 = this._scene._depthRenderer?.[this._camera.uniqueId];
    return this._ownsDepthRenderer ? !!registered11 : registered11 !== this._depthRenderer;
  }
  /**
   * Adds the depth map the pipeline owns to the render targets of the camera, or removes it. The scene collects
   * its own render targets before the pipeline decides wether it has anything to draw this frame, but renders
   * the ones of the camera after: the frame the pipeline has something to draw again, only the latter render the
   * depth map in time. They are only used for that frame, rendering it with the ones of the scene costs less
   * time to the CPU.
   */
  _setDepthMapRenderedWithCamera(value) {
    if (value === this._depthMapRenderedWithCamera || !this._depthRenderer) {
      return;
    }
    this._depthMapRenderedWithCamera = value;
    const renderTargets = this._camera.customRenderTargets;
    const depthMap = this._depthRenderer.getDepthMap();
    const index = renderTargets.indexOf(depthMap);
    if (value && index === -1) {
      renderTargets.push(depthMap);
    } else if (!value && index !== -1) {
      renderTargets.splice(index, 1);
    }
  }
  /**
   * Binds the two values needed to turn the content of the depth map back into a distance along the view
   * axis. The depth renderer stores "(clipZ + minZ) / (minZ + maxZ)", where "clipZ" is affine in the view
   * space Z for both the perspective and the orthographic projections, so the inverse is affine too and
   * can be derived exactly from the projection matrix instead of being approximated.
   */
  _bindDepthUniforms(effect) {
    const camera = this._camera;
    const engine = this._scene.getEngine();
    effect.setFloat2("volCameraMinMaxZ", camera.minZ, camera.maxZ);
    if (this._depthMode === 1) {
      effect.setFloat2("volDepthUnpack", 1, 0);
      return;
    }
    const isOrthographic = camera.mode === import_babylonjs22.Camera.ORTHOGRAPHIC_CAMERA;
    const minZ = isOrthographic ? !engine.useReverseDepthBuffer && engine.isNDCHalfZRange ? 0 : 1 : engine.useReverseDepthBuffer && engine.isNDCHalfZRange ? camera.minZ : engine.isNDCHalfZRange ? 0 : camera.minZ;
    const maxZ = isOrthographic ? engine.useReverseDepthBuffer && engine.isNDCHalfZRange ? 0 : 1 : engine.useReverseDepthBuffer && engine.isNDCHalfZRange ? 0 : camera.maxZ;
    const projection = this._scene.getProjectionMatrix().m;
    const scaleZ = projection[10];
    const offsetZ = projection[14];
    if (!scaleZ) {
      effect.setFloat2("volDepthUnpack", camera.maxZ, 0);
      return;
    }
    const sign = engine.useReverseDepthBuffer ? -1 : 1;
    effect.setFloat2("volDepthUnpack", sign * (minZ + maxZ) / scaleZ, (-sign * minZ - offsetZ) / scaleZ);
  }
  /**
   * Returns the number of samples the raymarching computes each frame, fewer with the temporal accumulation.
   */
  _getSamplingSteps() {
    return getVolumetricSamplingSteps(this._configuration, this._temporalSamplesDivider);
  }
  /**
   * Returns the dithering mode the raymarching is compiled with. The temporal accumulation needs the samples of
   * neighboring pixels to differ: it tells its own noise from the changes of the scene with it.
   */
  _getDitherMode() {
    const configuration2 = this._configuration;
    if (configuration2.temporalAccumulation && configuration2.ditherMode === VolumetricDitherMode.None) {
      return VolumetricDitherMode.InterleavedGradientNoise;
    }
    return configuration2.ditherMode;
  }
  _getEnvironment() {
    const configuration2 = this._configuration;
    const sampling = this._getSamplingSteps();
    let transmittance = VolumetricTransmittanceMode.Analytic;
    if (configuration2.heightFogEnabled) {
      transmittance = configuration2.fogMode === VolumetricFogMode.Exponential ? VolumetricTransmittanceMode.AnalyticHeight : VolumetricTransmittanceMode.Numeric;
    }
    return {
      depthMode: this._depthMode,
      ldrEncode: this._ldrEncode,
      reverseDepth: this._scene.getEngine().useReverseDepthBuffer,
      ndcHalfZ: this._scene.getEngine().isNDCHalfZRange,
      fogMode: configuration2.fogMode,
      transmittance,
      linearDepthPacked: this._linearDepthPacked,
      arrayLightCapacity: this._budget.maxArrayLights,
      steps: sampling.steps,
      lightSteps: sampling.lightSteps
    };
  }
  /**
   * Returns the defines of the passes reading the linear depth, which only depend on how it is stored.
   */
  _buildLinearDepthReadDefines(environment) {
    return environment.linearDepthPacked ? "#define VOL_LINEAR_DEPTH_PACKED\n" : "";
  }
  /**
   * Returns the defines of the linear depth pass, the only one reading the depth map of the depth renderer.
   */
  _buildLinearDepthDefines(environment) {
    let defines = this._buildLinearDepthReadDefines(environment);
    if (environment.depthMode === 2) {
      defines += "#define VOL_DEPTH_PACKED\n";
    } else if (environment.depthMode === 1) {
      defines += "#define VOL_DEPTH_VIEWZ\n";
    }
    return defines;
  }
  _buildScatteringDefines(selection, environment) {
    const configuration2 = this._configuration;
    const shadowed = selection?.shadowed ?? [];
    const directionalCount = selection?.directionalCount ?? 0;
    const csm = selection?.csm ?? null;
    const globalSlotCount = shadowed.filter((entry) => !entry.shadow.local).length;
    let defines = this._buildLinearDepthReadDefines(environment);
    defines += `#define VOL_STEPS ${environment.steps}
`;
    defines += `#define VOL_LIGHT_STEPS ${environment.lightSteps}
`;
    defines += `#define VOL_LOCAL_MAX_STEPS ${Math.max(environment.lightSteps, environment.steps)}
`;
    defines += `#define VOL_DISTRIBUTION ${configuration2.stepDistribution}
`;
    defines += `#define VOL_DITHER ${this._getDitherMode()}
`;
    defines += `#define VOL_PCF_TAPS ${configuration2.pcfTaps}
`;
    defines += `#define VOL_FOG_MODE ${environment.fogMode}
`;
    defines += `#define VOL_TRANSMITTANCE ${environment.transmittance}
`;
    if (environment.transmittance !== VolumetricTransmittanceMode.Analytic || environment.fogMode !== VolumetricFogMode.Linear) {
      defines += "#define VOL_OPTICAL_DEPTH\n";
    }
    defines += `#define VOL_TRANSMITTANCE_SAMPLES ${transmittanceSamples}
`;
    defines += `#define VOL_DEBUG ${configuration2.debugMode}
`;
    defines += `#define VOL_MAX_ARRAY_LIGHTS ${environment.arrayLightCapacity}
`;
    defines += `#define VOL_DIRECTIONAL_LIGHT_COUNT ${directionalCount}
`;
    defines += `#define VOL_LOCAL_ARRAY_LIGHTS ${environment.arrayLightCapacity > directionalCount ? 1 : 0}
`;
    defines += `#define VOL_SHADOW_SLOT_COUNT ${shadowed.length}
`;
    defines += `#define VOL_GLOBAL_LIGHT_COUNT ${directionalCount + globalSlotCount + (csm ? 1 : 0)}
`;
    if (configuration2.temporalAccumulation) {
      defines += "#define VOL_TEMPORAL_ACCUMULATION\n";
    } else if (configuration2.ditherMode !== VolumetricDitherMode.None && configuration2.temporalJitter) {
      defines += "#define VOL_TEMPORAL_JITTER\n";
    }
    if (configuration2.heightFogEnabled) {
      defines += "#define VOL_HEIGHT_FOG\n";
    }
    if (configuration2.lightExtinctionEnabled) {
      defines += "#define VOL_LIGHT_EXTINCTION\n";
    }
    if (configuration2.screenSpaceShadows) {
      defines += "#define VOL_SCREEN_SHADOWS\n";
      defines += `#define VOL_SCREEN_SHADOW_STEPS ${configuration2.screenSpaceShadowSteps}
`;
    }
    if (environment.ldrEncode) {
      defines += "#define VOL_LDR_ENCODE\n";
    }
    if (environment.reverseDepth) {
      defines += "#define VOL_REVERSE_DEPTH\n";
    }
    if (environment.ndcHalfZ) {
      defines += "#define VOL_NDC_HALF_Z\n";
    }
    shadowed.forEach((entry, index) => {
      defines += `#define VOL_SHADOW_KIND${index} ${entry.shadow.kind}
`;
      defines += `#define VOL_SHADOW_MODE${index} ${entry.shadow.mode}
`;
      defines += `#define VOL_SHADOW_LOCAL${index} ${entry.shadow.local ? 1 : 0}
`;
      if (entry.shadow.packed) {
        defines += `#define VOL_SHADOW_PACKED${index}
`;
      }
    });
    if (csm) {
      defines += "#define VOL_CSM\n";
      defines += `#define VOL_CSM_CASCADES ${csm.cascades}
`;
      defines += `#define VOL_CSM_KIND ${csm.kind === VolumetricShadowKind.Sampler2DShadow ? 1 : 0}
`;
      if (csm.packed) {
        defines += "#define VOL_CSM_PACKED\n";
      }
    }
    return defines;
  }
  _buildTemporalDefines(environment) {
    return this._buildLinearDepthReadDefines(environment);
  }
  _buildBlurDefines(environment) {
    return `${this._buildLinearDepthReadDefines(environment)}#define VOL_BLUR_RADIUS ${this._configuration.blurRadius}
`;
  }
  _buildComposeDefines(environment) {
    let defines = this._buildLinearDepthReadDefines(environment);
    defines += `#define VOL_DEBUG ${this._configuration.debugMode}
`;
    if (environment.ldrEncode) {
      defines += "#define VOL_LDR_ENCODE\n";
    }
    return defines;
  }
  _createPostProcess(options) {
    const postProcess = new import_babylonjs28.PostProcess(options.name, options.shaderName, options.uniforms, options.samplers, options.ratio, null, options.samplingMode, this._scene.getEngine(), false, options.defines, options.textureType, void 0, void 0, false, options.textureFormat, this._shaderLanguage);
    postProcess.autoClear = options.autoClear ?? false;
    postProcess.alphaMode = import_babylonjs24.Constants.ALPHA_DISABLE;
    return postProcess;
  }
  _buildRenderEffects() {
    const engine = this._scene.getEngine();
    const configuration2 = this._configuration;
    const environment = this._getEnvironment();
    this._linearDepthDefines = this._buildLinearDepthDefines(environment);
    this._scatteringDefines = this._buildScatteringDefines(this._selection, environment);
    this._temporalDefines = this._buildTemporalDefines(environment);
    this._blurDefines = this._buildBlurDefines(environment);
    this._composeDefines = this._buildComposeDefines(environment);
    this._linearDepthPostProcess = this._createPostProcess({
      name: "VolumetricLightingLinearDepth",
      shaderName: volumetricLightingLinearDepthShaderName,
      uniforms: ["volCameraMinMaxZ", "volDepthUnpack", "volPassParams"],
      samplers: ["depthSampler"],
      ratio: 1,
      samplingMode: import_babylonjs26.Texture.BILINEAR_SAMPLINGMODE,
      textureType: this._textureType,
      defines: this._linearDepthDefines,
      autoClear: true
    });
    this._linearDepthPostProcess.onApplyObservable.add((effect) => this._bindLinearDepth(effect));
    this._applyPrePassConfiguration();
    this._scatteringPostProcess = this._createPostProcess({
      name: "VolumetricLightingScattering",
      shaderName: volumetricLightingScatteringShaderName,
      uniforms: scatteringUniforms,
      samplers: scatteringSamplers,
      ratio: 1,
      samplingMode: import_babylonjs26.Texture.NEAREST_SAMPLINGMODE,
      textureType: this._linearDepthType,
      textureFormat: this._linearDepthPacked ? import_babylonjs24.Constants.TEXTUREFORMAT_RGBA : import_babylonjs24.Constants.TEXTUREFORMAT_R,
      defines: this._scatteringDefines
    });
    this._scatteringPostProcess.onApplyObservable.add((effect) => this._bindScattering(effect));
    this._temporalPostProcess = null;
    if (configuration2.temporalAccumulation) {
      this._temporalPostProcess = this._createPostProcess({
        name: "VolumetricLightingTemporal",
        shaderName: volumetricLightingTemporalShaderName,
        uniforms: temporalUniforms,
        samplers: ["volHistorySampler", "volLinearDepthSampler"],
        ratio: configuration2.resolutionScale,
        samplingMode: import_babylonjs26.Texture.BILINEAR_SAMPLINGMODE,
        textureType: this._textureType,
        defines: this._temporalDefines
      });
      this._temporalPostProcess.onActivateObservable.add(() => this._prepareHistory());
      this._temporalPostProcess.onApplyObservable.add((effect) => this._bindTemporal(effect));
    }
    this._blurPostProcesses = [];
    for (let i = 0; i < configuration2.blurPasses; ++i) {
      const blurPostProcess = this._createPostProcess({
        name: `VolumetricLightingBlur${i}`,
        shaderName: volumetricLightingBlurShaderName,
        uniforms: ["volCameraMinMaxZ", "volDepthRatio", "volBlurDirection", "volBlurParams", "volPassParams"],
        samplers: ["volLinearDepthSampler"],
        ratio: configuration2.resolutionScale,
        samplingMode: import_babylonjs26.Texture.BILINEAR_SAMPLINGMODE,
        textureType: this._textureType,
        defines: this._blurDefines
      });
      blurPostProcess.onApplyObservable.add((effect) => this._bindBlur(effect, i));
      this._blurPostProcesses.push(blurPostProcess);
    }
    this._composePostProcess = this._createPostProcess({
      name: "VolumetricLightingCompose",
      shaderName: volumetricLightingComposeShaderName,
      uniforms: ["volCameraMinMaxZ", "volDepthRatio", "volComposeParams", "volPassParams"],
      samplers: ["volSceneSampler", "volLinearDepthSampler"],
      ratio: configuration2.resolutionScale,
      samplingMode: import_babylonjs26.Texture.BILINEAR_SAMPLINGMODE,
      textureType: this._textureType,
      defines: this._composeDefines
    });
    this._composePostProcess.onApplyObservable.add((effect) => this._bindCompose(effect));
    this.addEffect(new import_babylonjs30.PostProcessRenderEffect(engine, _VolumetricLightingRenderingPipeline.SceneColorEffectName, () => this._linearDepthPostProcess, true));
    this.addEffect(new import_babylonjs30.PostProcessRenderEffect(engine, _VolumetricLightingRenderingPipeline.ScatteringEffectName, () => this._scatteringPostProcess, true));
    if (this._temporalPostProcess) {
      this.addEffect(new import_babylonjs30.PostProcessRenderEffect(engine, _VolumetricLightingRenderingPipeline.TemporalEffectName, () => this._temporalPostProcess, true));
    }
    if (this._blurPostProcesses.length) {
      this.addEffect(new import_babylonjs30.PostProcessRenderEffect(engine, _VolumetricLightingRenderingPipeline.BlurEffectName, () => this._blurPostProcesses, true));
    }
    this.addEffect(new import_babylonjs30.PostProcessRenderEffect(engine, _VolumetricLightingRenderingPipeline.ComposeEffectName, () => this._composePostProcess, true));
    this._applyMsaaSamples();
  }
  _disposePostProcesses(cameras) {
    const postProcesses = [
      this._linearDepthPostProcess,
      this._scatteringPostProcess,
      this._temporalPostProcess,
      ...this._blurPostProcesses,
      this._composePostProcess
    ];
    postProcesses.forEach((postProcess) => {
      if (!postProcess) {
        return;
      }
      cameras.forEach((camera) => postProcess.dispose(camera));
      postProcess.dispose();
    });
    this._linearDepthPostProcess = null;
    this._scatteringPostProcess = null;
    this._temporalPostProcess = null;
    this._blurPostProcesses = [];
    this._composePostProcess = null;
    this._disposeHistory();
  }
  /**
   * Releases the textures holding the history of the temporal accumulation. The next frame starts over from the
   * result of the raymarching alone.
   */
  _disposeHistory() {
    this._historyTextures.forEach((texture) => texture?.dispose());
    this._historyTextures = [null, null];
    this._historyFrames = [-1, -1];
  }
  /**
   * Swaps the two textures holding the history of the temporal accumulation, as the pass is activated: the one
   * written last frame is read back, the other one receives the result of this frame and is what the pass after
   * it reads, the same way the TAA rendering pipeline of Babylon.js does.
   */
  _prepareHistory() {
    const temporal = this._temporalPostProcess;
    const next = this._blurPostProcesses[0] ?? this._composePostProcess;
    if (!temporal || !next) {
      return;
    }
    ++this._temporalFrame;
    const width = temporal.width;
    const height = temporal.height;
    const texture = this._historyTextures[0];
    if (!texture || texture.width !== width || texture.height !== height) {
      this._disposeHistory();
      const engine = this._scene.getEngine();
      for (let i = 0; i < 2; ++i) {
        this._historyTextures[i] = engine.createRenderTargetTexture({ width, height }, {
          generateMipMaps: false,
          generateDepthBuffer: false,
          generateStencilBuffer: false,
          type: this._textureType,
          format: import_babylonjs24.Constants.TEXTUREFORMAT_RGBA,
          samplingMode: import_babylonjs24.Constants.TEXTURE_BILINEAR_SAMPLINGMODE,
          label: `VolumetricLightingHistory${i}`
        });
      }
    }
    this._historyIndex ^= 1;
    next.inputTexture = this._historyTextures[this._historyIndex];
  }
  /**
   * Rebuilds the chain of post-processes. Changing the resolution of the scattering buffer or the number
   * of blur passes changes the shape of the chain, which a post-process can't do in place.
   */
  _rebuildRenderEffects() {
    if (this._disposed) {
      return;
    }
    const manager = this._scene.postProcessRenderPipelineManager;
    const cameras = this._cameras.slice();
    try {
      manager.detachCamerasFromRenderPipeline(this.name, cameras);
      this._disposePostProcesses(cameras);
      Object.keys(this._renderEffects).forEach((key) => {
        delete this._renderEffects[key];
      });
      this._buildRenderEffects();
    } catch (e) {
      console.error("Failed to rebuild the volumetric lighting rendering pipeline.", e);
    } finally {
      try {
        manager.attachCamerasToRenderPipeline(this.name, cameras);
      } catch (e) {
        console.error("Failed to re-attach the cameras to the volumetric lighting rendering pipeline.", e);
      }
    }
    this._lightsDirty = true;
  }
  /**
   * Runs the selection pass and recompiles the shaders when, and only when, their defines changed. The
   * identity, the number and the values of the point and spot lights change every frame and only cost a
   * uniform update: only the directional lights and the kinds of the shadow maps shape the shader.
   */
  _updateSelection() {
    if (this._disposed || !this._scatteringPostProcess) {
      return;
    }
    ++this._frameCount;
    const shouldSelect = this._lightsDirty || !this._selection || this._frameCount % this._configuration.selectionRefreshRate === 0;
    if (!shouldSelect) {
      return;
    }
    this._lightsDirty = false;
    const environment = this._getEnvironment();
    const selection = selectVolumetricLights(this._scene, this._camera, this._configuration, this._budget, this._selection);
    this._selection = selection;
    this._updateIdleState(selection);
    const scatteringDefines = this._buildScatteringDefines(selection, environment);
    if (scatteringDefines !== this._scatteringDefines) {
      this._scatteringDefines = scatteringDefines;
      this._scatteringPostProcess.updateEffect(scatteringDefines);
    }
    const temporalDefines = this._buildTemporalDefines(environment);
    if (temporalDefines !== this._temporalDefines) {
      this._temporalDefines = temporalDefines;
      this._temporalPostProcess?.updateEffect(temporalDefines);
    }
    const linearDepthDefines = this._buildLinearDepthDefines(environment);
    if (linearDepthDefines !== this._linearDepthDefines) {
      this._linearDepthDefines = linearDepthDefines;
      this._linearDepthPostProcess?.updateEffect(linearDepthDefines);
    }
    const blurDefines = this._buildBlurDefines(environment);
    if (blurDefines !== this._blurDefines) {
      this._blurDefines = blurDefines;
      this._blurPostProcesses.forEach((blurPostProcess) => blurPostProcess.updateEffect(blurDefines));
    }
    const composeDefines = this._buildComposeDefines(environment);
    if (composeDefines !== this._composeDefines) {
      this._composeDefines = composeDefines;
      this._composePostProcess?.updateEffect(composeDefines);
    }
  }
  /**
   * Detects when the pipeline has nothing to draw: no light reaches the view of the camera and the medium neither
   * glows nor attenuates the scene. Every pass then exits right away, the composition outputs the color of the
   * scene exactly as it would under light shafts of zero intensity, and the depth renderer the pipeline owns stops
   * rendering the scene a second time. This is driven by uniforms rather than by detaching the passes, so a light
   * blinking on and off, a muzzle flash typically, never rebuilds anything.
   */
  _updateIdleState(selection) {
    const configuration2 = this._configuration;
    const ambient = configuration2.ambientColor;
    const hasLights = selection.shadowed.length > 0 || selection.unshadowed.length > 0 || !!selection.csm;
    const hasAmbient = configuration2.ambientIntensity > 0 && (ambient[0] > 0 || ambient[1] > 0 || ambient[2] > 0);
    const idle = !hasLights && !hasAmbient && configuration2.extinctionAmount <= 0 && configuration2.debugMode === VolumetricDebugMode.None;
    if (idle === this._idle) {
      return;
    }
    this._idle = idle;
    if (this._ownsDepthRenderer && this._depthRenderer) {
      this._depthRenderer.enabled = !idle;
      this._setDepthMapRenderedWithCamera(!idle);
    }
  }
  /**
   * Prepares the depth shaders of the meshes while the depth renderer the pipeline owns is off, a few meshes per
   * frame. Without this, the first frame with something to draw after the scene got new meshes, or after the
   * pipeline was created without anything to draw, would miss every mesh whose depth shader is still compiling.
   * The checks are the ones the scene runs for its depth renderers when it waits to be ready.
   */
  _warmUpDepthRenderer() {
    const depthRenderer = this._depthRenderer;
    if (!this._idle || !this._ownsDepthRenderer || !depthRenderer || !this._depthWarmup.size) {
      return;
    }
    const instancedArrays = this._scene.getEngine().getCaps().instancedArrays;
    const compiling = [];
    let budget = depthWarmupMeshesPerFrame;
    for (const mesh of this._depthWarmup) {
      if (budget-- <= 0) {
        break;
      }
      this._depthWarmup.delete(mesh);
      if (mesh.isDisposed() || !mesh.subMeshes?.length) {
        continue;
      }
      const className = mesh.getClassName();
      const instanced = mesh.hasThinInstances || className === "InstancedMesh" || className === "InstancedLinesMesh" || instancedArrays && (mesh.instances?.length ?? 0) > 0;
      let ready = true;
      mesh.subMeshes.forEach((subMesh) => {
        const material = subMesh.getMaterial();
        if (material && !material.disableDepthWrite && subMesh.verticesCount > 0 && !depthRenderer.isReady(subMesh, instanced)) {
          ready = false;
        }
      });
      if (!ready) {
        compiling.push(mesh);
      }
    }
    compiling.forEach((mesh) => this._depthWarmup.add(mesh));
  }
  /**
   * Fills the four vectors describing a light in the raymarching shader. The packing follows what
   * "Light.transferToEffect" writes for the surfaces of the scene so the shafts agree with them, except for
   * the position of the point and spot lights, which is written relative to the camera: the raymarching
   * works in that space, which keeps its precision whatever the distance of the scene to the origin.
   */
  _writeLight(candidate, index, data, diffuse, direction, falloff) {
    const { light, config } = candidate;
    const offset = index * 4;
    if (isDirectionalLight(light)) {
      getVolumetricLightWorldDirection(light, this._temporaryVector);
      data[offset] = -this._temporaryVector.x;
      data[offset + 1] = -this._temporaryVector.y;
      data[offset + 2] = -this._temporaryVector.z;
      data[offset + 3] = 1;
    } else {
      getVolumetricLightWorldPosition(light, this._temporaryVector).subtractInPlace(this._camera.globalPosition);
      data[offset] = this._temporaryVector.x;
      data[offset + 1] = this._temporaryVector.y;
      data[offset + 2] = this._temporaryVector.z;
      data[offset + 3] = isSpotLight(light) ? 2 : 0;
    }
    if (config.useCustomColor) {
      this._temporaryColor.set(config.color[0], config.color[1], config.color[2]);
    } else {
      this._temporaryColor.copyFrom(light.diffuse);
    }
    const scale = light.getScaledIntensity() * config.volumeIntensity * 1e-5;
    diffuse[offset] = this._temporaryColor.r * scale;
    diffuse[offset + 1] = this._temporaryColor.g * scale;
    diffuse[offset + 2] = this._temporaryColor.b * scale;
    diffuse[offset + 3] = config.anisotropy;
    if (isSpotLight(light)) {
      getVolumetricLightWorldDirection(light, this._temporaryVector);
      direction[offset] = this._temporaryVector.x;
      direction[offset + 1] = this._temporaryVector.y;
      direction[offset + 2] = this._temporaryVector.z;
      direction[offset + 3] = Math.cos(light.angle * 0.5);
      falloff[offset + 1] = light.exponent;
    } else {
      direction[offset] = 0;
      direction[offset + 1] = 0;
      direction[offset + 2] = 1;
      direction[offset + 3] = -1;
      falloff[offset + 1] = 1;
    }
    falloff[offset] = getVolumetricLightRange(light, config, this._configuration);
    falloff[offset + 2] = config.castVolumetricShadows ? 1 : 0;
    falloff[offset + 3] = config.shadowDarkness;
  }
  _bindLinearDepth(effect) {
    effect.setFloat4("volPassParams", this._idle ? 1 : 0, 0, 0, 0);
    let depthTexture = null;
    switch (this._depthSource) {
      case VolumetricDepthSource.PrePass: {
        const prePassRenderer = getVolumetricPrePassRenderer(this._scene);
        depthTexture = prePassRenderer ? getVolumetricPrePassDepthTexture(prePassRenderer) : null;
        break;
      }
      case VolumetricDepthSource.GeometryBuffer: {
        const geometryBufferRenderer = getVolumetricGeometryBufferRenderer(this._scene);
        depthTexture = geometryBufferRenderer ? getVolumetricGeometryBufferDepthTexture(geometryBufferRenderer) : null;
        break;
      }
      default:
        depthTexture = this._depthRenderer?.getDepthMap() ?? null;
        break;
    }
    if (!depthTexture) {
      return;
    }
    effect.setTexture("depthSampler", depthTexture);
    this._bindDepthUniforms(effect);
  }
  _bindScattering(effect) {
    const scene = this._scene;
    const camera = this._camera;
    const configuration2 = this._configuration;
    const selection = this._selection;
    if (!selection) {
      return;
    }
    effect.setFloat4("volPassParams", this._idle ? 1 : 0, 0, 0, 0);
    this._inverseViewProjection.copyFrom(scene.getTransformMatrix());
    this._inverseViewProjection.invert();
    effect.setMatrix("volInverseViewProjection", this._inverseViewProjection);
    effect.setVector3("volCameraPosition", camera.globalPosition);
    camera.getDirectionToRef(scene.useRightHandedSystem ? rightHandedForward : leftHandedForward, this._temporaryVector);
    effect.setVector3("volCameraForward", this._temporaryVector.normalize());
    effect.setFloat2("volCameraMinMaxZ", camera.minZ, camera.maxZ);
    effect.setFloat("volFrameIndex", scene.getRenderId() % 64);
    effect.setFloat("volTemporalOffset", this._frameCount * goldenRatioConjugate % 1);
    this._bindDepthRatio(effect);
    effect.setFloat4("volFogInfos", configuration2.fogMode, configuration2.fogStart, configuration2.fogEnd, configuration2.fogDensity);
    this._temporaryColor.set(configuration2.fogColor[0], configuration2.fogColor[1], configuration2.fogColor[2]);
    effect.setColor3("volFogColor", this._temporaryColor);
    effect.setFloat("volLinearFogEps", Math.max((configuration2.fogEnd - configuration2.fogStart) * 0.02, 1e-4));
    effect.setFloat4("volMedium", configuration2.albedo, configuration2.heightFogBaseHeight, configuration2.heightFogFalloff, 0);
    if (configuration2.screenSpaceShadows) {
      effect.setMatrix("volViewProjection", scene.getTransformMatrix());
      effect.setFloat4("volScreenShadowParams", configuration2.screenSpaceShadowMaxDistance, configuration2.screenSpaceShadowBias, configuration2.screenSpaceShadowThickness, 0);
    }
    this._temporaryColor.set(configuration2.ambientColor[0], configuration2.ambientColor[1], configuration2.ambientColor[2]).scaleInPlace(configuration2.ambientIntensity);
    effect.setColor3("volAmbient", this._temporaryColor);
    const unshadowedCount = selection.unshadowed.length;
    const localCount = unshadowedCount - selection.directionalCount;
    const ditherStrength = configuration2.temporalAccumulation ? 1 : configuration2.ditherStrength;
    effect.setFloat4("volParams", configuration2.maxDistance, ditherStrength, configuration2.lightExtinctionClamp, localCount);
    for (let i = 0; i < unshadowedCount; ++i) {
      this._writeLight(selection.unshadowed[i], i, this._lightData, this._lightDiffuse, this._lightDirection, this._lightFalloff);
    }
    if (unshadowedCount) {
      const count = unshadowedCount * 4;
      effect.setFloatArray4("volLightData", this._lightData.subarray(0, count));
      effect.setFloatArray4("volLightDiffuse", this._lightDiffuse.subarray(0, count));
      effect.setFloatArray4("volLightDirection", this._lightDirection.subarray(0, count));
      effect.setFloatArray4("volLightFalloff", this._lightFalloff.subarray(0, count));
    }
    selection.shadowed.forEach((entry, index) => {
      this._writeLight(entry.candidate, index, this._shadowLightData, this._shadowLightDiffuse, this._shadowLightDirection, this._shadowLightFalloff);
      const { generator, kind, mode, mapSize } = entry.shadow;
      const light = entry.candidate.light;
      const offset = index * 4;
      this._shadowLightFalloff[offset + 2] = generator.frustumEdgeFalloff;
      const depthMinZ = light.getDepthMinZ?.(scene.activeCamera) ?? 0;
      const depthMaxZ = light.getDepthMaxZ?.(scene.activeCamera) ?? 1;
      this._shadowInfo[offset] = generator.getDarkness();
      this._shadowInfo[offset + 1] = kind === VolumetricShadowKind.Sampler2DShadow ? 1 / mapSize : mode === 0 ? 0 : generator.depthScale;
      this._shadowInfo[offset + 2] = depthMinZ;
      this._shadowInfo[offset + 3] = depthMinZ + depthMaxZ;
      generator.getTransformMatrix().copyToArray(this._shadowMatrices, index * 16);
      const shadowMap = generator.getShadowMapForRendering();
      if (kind === VolumetricShadowKind.Sampler2DShadow) {
        effect.setDepthStencilTexture(`volShadowSampler${index}`, shadowMap);
      } else {
        effect.setTexture(`volShadowSampler${index}`, shadowMap);
      }
    });
    if (selection.shadowed.length) {
      const count = selection.shadowed.length * 4;
      effect.setFloatArray4("volShadowLightData", this._shadowLightData.subarray(0, count));
      effect.setFloatArray4("volShadowLightDiffuse", this._shadowLightDiffuse.subarray(0, count));
      effect.setFloatArray4("volShadowLightDirection", this._shadowLightDirection.subarray(0, count));
      effect.setFloatArray4("volShadowLightFalloff", this._shadowLightFalloff.subarray(0, count));
      effect.setFloatArray4("volShadowInfo", this._shadowInfo.subarray(0, count));
      effect.setMatrices("volShadowMatrix", this._shadowMatrices.subarray(0, selection.shadowed.length * 16));
    }
    if (selection.csm) {
      const { candidate, generator, cascades, kind } = selection.csm;
      const light = candidate.light;
      this._writeLight(candidate, 0, this._csmLightData, this._csmLightDiffuse, this._csmLightDirection, this._csmLightFalloff);
      effect.setFloat4("volCsmLightData", this._csmLightData[0], this._csmLightData[1], this._csmLightData[2], this._csmLightData[3]);
      effect.setFloat4("volCsmLightDiffuse", this._csmLightDiffuse[0], this._csmLightDiffuse[1], this._csmLightDiffuse[2], this._csmLightDiffuse[3]);
      effect.setFloat4("volCsmLightDirection", this._csmLightDirection[0], this._csmLightDirection[1], this._csmLightDirection[2], this._csmLightDirection[3]);
      effect.setFloat4("volCsmLightFalloff", this._csmLightFalloff[0], this._csmLightFalloff[1], generator.frustumEdgeFalloff, candidate.config.shadowDarkness);
      const depthMinZ = light.getDepthMinZ?.(scene.activeCamera) ?? 1;
      const depthMaxZ = light.getDepthMaxZ?.(scene.activeCamera) ?? 1;
      const mapSize = generator.getShadowMap()?.getSize().width ?? 1024;
      effect.setFloat4("volCsmInfo", generator.getDarkness(), 1 / mapSize, depthMinZ, depthMinZ + depthMaxZ);
      for (let i = 0; i < cascades; ++i) {
        generator.getCascadeTransformMatrix(i)?.copyToArray(this._csmMatrices, i * 16);
      }
      effect.setMatrices("volCsmMatrices", this._csmMatrices.subarray(0, cascades * 16));
      const shadowMap = generator.getShadowMapForRendering();
      if (kind === VolumetricShadowKind.Sampler2DShadow) {
        effect.setDepthStencilTexture("volCsmSampler", shadowMap);
      } else {
        effect.setTexture("volCsmSampler", shadowMap);
      }
    }
  }
  /**
   * Binds the ratio between the resolution of the linear depth and the resolution of the scattering buffer.
   * It is computed here rather than in the shaders so every pass rounds it exactly the same way, which is what
   * makes them all associate each texel of the scattering buffer with the same texel of the linear depth.
   */
  _bindDepthRatio(effect) {
    const depth = this._scatteringPostProcess;
    const scattering = this._temporalPostProcess ?? this._blurPostProcesses[0] ?? this._composePostProcess;
    const depthWidth = depth && depth.width > 0 ? depth.width : 1;
    const depthHeight = depth && depth.height > 0 ? depth.height : 1;
    const scatteringWidth = scattering && scattering.width > 0 ? scattering.width : depthWidth;
    const scatteringHeight = scattering && scattering.height > 0 ? scattering.height : depthHeight;
    effect.setFloat2("volDepthRatio", depthWidth / scatteringWidth, depthHeight / scatteringHeight);
  }
  _bindTemporal(effect) {
    const scene = this._scene;
    const camera = this._camera;
    const configuration2 = this._configuration;
    if (!this._scatteringPostProcess) {
      return;
    }
    const historyIndex = this._historyIndex ^ 1;
    const history = this._historyTextures[historyIndex];
    effect._bindTexture("volHistorySampler", history?.texture ?? scene.getEngine().emptyTexture);
    effect.setTextureFromPostProcess("volLinearDepthSampler", this._scatteringPostProcess);
    effect.setFloat2("volCameraMinMaxZ", camera.minZ, camera.maxZ);
    this._bindDepthRatio(effect);
    this._inverseViewProjection.copyFrom(scene.getTransformMatrix());
    this._inverseViewProjection.invert();
    effect.setMatrix("volInverseViewProjection", this._inverseViewProjection);
    effect.setVector3("volCameraPosition", camera.globalPosition);
    camera.getDirectionToRef(scene.useRightHandedSystem ? rightHandedForward : leftHandedForward, this._temporaryVector);
    effect.setVector3("volCameraForward", this._temporaryVector.normalize());
    const position = camera.globalPosition;
    import_babylonjs25.Matrix.TranslationToRef(position.x, position.y, position.z, this._cameraTranslation);
    this._cameraTranslation.multiplyToRef(this._previousViewProjection, this._previousViewProjectionRelative);
    effect.setMatrix("volPreviousViewProjection", this._previousViewProjectionRelative);
    const historyValid = !this._idle && !!history && this._historyFrames[historyIndex] === this._temporalFrame - 1;
    const historyState = historyValid ? this._historyEmpty[historyIndex] ? 2 : 1 : 0;
    effect.setFloat4("volTemporalParams", configuration2.temporalAccumulationFactor, this._temporalClippingWidth, configuration2.maxDistance, historyState);
    const translation = historyValid ? import_babylonjs25.Vector3.Distance(position, this._previousCameraPosition) : 0;
    effect.setFloat2("volTemporalMotion", translation, this._temporalMotionTolerance);
    this._historyFrames[this._historyIndex] = this._temporalFrame;
    this._historyEmpty[this._historyIndex] = this._idle;
    this._previousViewProjection.copyFrom(scene.getTransformMatrix());
    this._previousCameraPosition.copyFrom(position);
  }
  _bindBlur(effect, index) {
    if (!this._scatteringPostProcess) {
      return;
    }
    effect.setFloat4("volPassParams", this._idle ? 1 : 0, 0, 0, 0);
    effect.setTextureFromPostProcess("volLinearDepthSampler", this._scatteringPostProcess);
    effect.setFloat2("volCameraMinMaxZ", this._camera.minZ, this._camera.maxZ);
    this._bindDepthRatio(effect);
    effect.setFloat2("volBlurDirection", index % 2 === 0 ? 1 : 0, index % 2 === 0 ? 0 : 1);
    effect.setFloat2("volBlurParams", Math.max(this._configuration.blurRadius * 0.5, 0.5), this._configuration.blurDepthThreshold);
  }
  _bindCompose(effect) {
    if (!this._linearDepthPostProcess || !this._scatteringPostProcess) {
      return;
    }
    const configuration2 = this._configuration;
    effect.setTextureFromPostProcess("volSceneSampler", this._linearDepthPostProcess);
    effect.setTextureFromPostProcess("volLinearDepthSampler", this._scatteringPostProcess);
    effect.setFloat4("volPassParams", this._idle ? 1 : 0, 0, 0, 0);
    effect.setFloat2("volCameraMinMaxZ", this._camera.minZ, this._camera.maxZ);
    this._bindDepthRatio(effect);
    const outputDither = this._ldrEncode ? 1 / 255 : 0;
    effect.setFloat4("volComposeParams", configuration2.intensity, configuration2.extinctionAmount, configuration2.upsampleDepthThreshold, outputDither);
  }
};

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/rendering/volumetric-lighting.js
var volumetricLightingRenderingPipeline = null;
var configuration = null;
function getVolumetricLightingRenderingPipelineConfiguration() {
  return configuration;
}
__name(getVolumetricLightingRenderingPipelineConfiguration, "getVolumetricLightingRenderingPipelineConfiguration");
function setVolumetricLightingRenderingPipelineConfiguration(config) {
  configuration = config;
}
__name(setVolumetricLightingRenderingPipelineConfiguration, "setVolumetricLightingRenderingPipelineConfiguration");
function getVolumetricLightingRenderingPipeline() {
  if (volumetricLightingRenderingPipeline?.isDisposed) {
    volumetricLightingRenderingPipeline = null;
  }
  return volumetricLightingRenderingPipeline;
}
__name(getVolumetricLightingRenderingPipeline, "getVolumetricLightingRenderingPipeline");
function disposeVolumetricLightingRenderingPipeline() {
  if (volumetricLightingRenderingPipeline) {
    volumetricLightingRenderingPipeline.dispose();
    volumetricLightingRenderingPipeline = null;
  }
}
__name(disposeVolumetricLightingRenderingPipeline, "disposeVolumetricLightingRenderingPipeline");
function createVolumetricLightingRenderingPipeline(scene, camera, options) {
  volumetricLightingRenderingPipeline = new VolumetricLightingRenderingPipeline("VolumetricLightingRenderingPipeline", scene, camera);
  volumetricLightingRenderingPipeline.msaaSamples = options?.msaaSamples ?? 1;
  return volumetricLightingRenderingPipeline;
}
__name(createVolumetricLightingRenderingPipeline, "createVolumetricLightingRenderingPipeline");
function parseVolumetricLightingRenderingPipeline(scene, camera, data, options) {
  const pipeline = volumetricLightingRenderingPipeline ?? createVolumetricLightingRenderingPipeline(scene, camera, options);
  pipeline.msaaSamples = options?.msaaSamples ?? 1;
  const configuration2 = { ...data };
  if (configuration2.fogDensity === void 0) {
    configuration2.fogDensity = VolumetricLightingRenderingPipeline.GetDefaultFogDensity(pipeline.scene, pipeline.camera);
  }
  if (configuration2.fogEnd === void 0) {
    configuration2.fogEnd = VolumetricLightingRenderingPipeline.GetDefaultFogEnd(pipeline.scene, pipeline.camera);
  }
  if (configuration2.screenSpaceShadowMaxDistance === void 0) {
    configuration2.screenSpaceShadowMaxDistance = VolumetricLightingRenderingPipeline.GetDefaultFogEnd(pipeline.scene, pipeline.camera);
  }
  pipeline.applyConfiguration(normalizeVolumetricLightingConfiguration(configuration2));
  return pipeline;
}
__name(parseVolumetricLightingRenderingPipeline, "parseVolumetricLightingRenderingPipeline");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/rendering/tools.js
function applyRenderingConfigurationForCamera(camera, rootUrl, options) {
  disposeSSAO2RenderingPipeline();
  disposeVLSPostProcess(camera.getScene());
  disposeSSRRenderingPipeline();
  disposeMotionBlurPostProcess();
  disposeVolumetricLightingRenderingPipeline();
  disposeDefaultRenderingPipeline();
  disposeTAARenderingPipeline();
  keepRenderingPipelinesOrdered(camera.getScene());
  const ssao2RenderingPipeline = ssaoRenderingPipelineCameraConfigurations.get(camera);
  if (ssao2RenderingPipeline && !options?.ssao2Disabled) {
    parseSSAO2RenderingPipeline(camera.getScene(), camera, ssao2RenderingPipeline, options);
  }
  const volumetricLightingRenderingPipeline2 = getVolumetricLightingRenderingPipelineConfiguration();
  if (volumetricLightingRenderingPipeline2 && !options?.volumetricLightingDisabled) {
    parseVolumetricLightingRenderingPipeline(camera.getScene(), camera, volumetricLightingRenderingPipeline2, options);
  }
  const vlsPostProcess2 = vlsPostProcessCameraConfigurations.get(camera);
  if (vlsPostProcess2 && !options?.vlsDisabled) {
    parseVLSPostProcess(camera.getScene(), vlsPostProcess2, options);
  }
  const ssrRenderingPipeline2 = ssrRenderingPipelineCameraConfigurations.get(camera);
  if (ssrRenderingPipeline2 && !options?.ssrDisabled) {
    parseSSRRenderingPipeline(camera.getScene(), camera, ssrRenderingPipeline2, options);
  }
  const motionBlurPostProcess2 = motionBlurPostProcessCameraConfigurations.get(camera);
  if (motionBlurPostProcess2 && !options?.motionBlurDisabled) {
    parseMotionBlurPostProcess(camera.getScene(), camera, motionBlurPostProcess2, options);
  }
  const defaultRenderingPipeline2 = defaultPipelineCameraConfigurations.get(camera);
  if (defaultRenderingPipeline2 && !options?.defaultPipelineDisabled) {
    parseDefaultRenderingPipeline(camera.getScene(), camera, defaultRenderingPipeline2, rootUrl, options);
  }
  const taaRenderingPipeline2 = taaRenderingPipelineCameraConfigurations.get(camera);
  if (taaRenderingPipeline2 && !options?.taaDisabled) {
    parseTAARenderingPipeline(camera.getScene(), camera, taaRenderingPipeline2, options);
  }
}
__name(applyRenderingConfigurationForCamera, "applyRenderingConfigurationForCamera");
function getHdrTextureType(engine) {
  const caps = engine.getCaps();
  if (caps.textureHalfFloatRender) {
    return import_babylonjs32.Constants.TEXTURETYPE_HALF_FLOAT;
  } else if (caps.textureFloatRender) {
    return import_babylonjs32.Constants.TEXTURETYPE_FLOAT;
  }
  return import_babylonjs32.Constants.TEXTURETYPE_UNSIGNED_BYTE;
}
__name(getHdrTextureType, "getHdrTextureType");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/physics.js
var import_babylonjs33 = require("babylonjs");
var import_babylonjs34 = require("babylonjs");
function configurePhysicsAggregate(transformNode) {
  const data = transformNode.metadata?.physicsAggregate;
  if (!data) {
    return;
  }
  let mesh = void 0;
  if (isMesh(transformNode)) {
    mesh = transformNode;
  } else if (isInstancedMesh(transformNode)) {
    mesh = transformNode.sourceMesh;
  }
  const aggregate = new import_babylonjs34.PhysicsAggregate(transformNode, data.shape.type, {
    mesh,
    mass: data.massProperties.mass
  });
  aggregate.body.setMassProperties({
    mass: data.massProperties.mass,
    inertia: data.massProperties.inertia ? import_babylonjs33.Vector3.FromArray(data.massProperties.inertia) : void 0,
    centerOfMass: data.massProperties.centerOfMass ? import_babylonjs33.Vector3.FromArray(data.massProperties.centerOfMass) : void 0,
    inertiaOrientation: data.massProperties.inertiaOrientation ? import_babylonjs33.Quaternion.FromArray(data.massProperties.inertiaOrientation) : void 0
  });
  aggregate.shape.density = data.shape.density;
  aggregate.body.setMotionType(data.body.motionType);
  aggregate.shape.material = data.material;
  transformNode.physicsAggregate = aggregate;
  transformNode.metadata.physicsAggregate = void 0;
}
__name(configurePhysicsAggregate, "configurePhysicsAggregate");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/rendering.js
function applyRenderingConfigurations(scene, metadata) {
  const rendering = metadata?.rendering;
  if (metadata.volumetricLightingRenderingPipelineConfiguration) {
    setVolumetricLightingRenderingPipelineConfiguration(metadata.volumetricLightingRenderingPipelineConfiguration);
  }
  const postProcessConfigurations = Array.isArray(rendering) ? rendering : [];
  postProcessConfigurations.forEach((configuration2) => {
    const camera = scene.getCameraById(configuration2.cameraId);
    if (!camera) {
      return;
    }
    if (configuration2.ssao2RenderingPipeline) {
      ssaoRenderingPipelineCameraConfigurations.set(camera, configuration2.ssao2RenderingPipeline);
    }
    if (configuration2.vlsPostProcess) {
      vlsPostProcessCameraConfigurations.set(camera, configuration2.vlsPostProcess);
    }
    if (configuration2.ssrRenderingPipeline) {
      ssrRenderingPipelineCameraConfigurations.set(camera, configuration2.ssrRenderingPipeline);
    }
    if (configuration2.motionBlurPostProcess) {
      motionBlurPostProcessCameraConfigurations.set(camera, configuration2.motionBlurPostProcess);
    }
    if (configuration2.defaultRenderingPipeline) {
      defaultPipelineCameraConfigurations.set(camera, configuration2.defaultRenderingPipeline);
    }
    if (configuration2.taaRenderingPipeline) {
      taaRenderingPipelineCameraConfigurations.set(camera, configuration2.taaRenderingPipeline);
    }
  });
}
__name(applyRenderingConfigurations, "applyRenderingConfigurations");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/decorators/apply.js
var import_babylonjs51 = require("babylonjs");
var import_babylonjs52 = require("babylonjs");
var import_babylonjs53 = require("babylonjs");
var import_babylonjs54 = require("babylonjs");
var import_babylonjs55 = require("babylonjs");
var import_babylonjs_gui = require("babylonjs-gui");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/tools/request.js
var import_babylonjs35 = require("babylonjs");
function loadFile(url, responseType, progressCallback) {
  return new Promise((resolve, reject) => {
    const request = new import_babylonjs35.WebRequest();
    request.open("GET", url);
    request.responseType = responseType;
    request.send();
    request.addEventListener("progress", (ev) => {
      progressCallback?.({
        total: ev.total,
        loaded: ev.loaded
      });
    });
    request.addEventListener("load", () => {
      resolve(responseType === "text" ? request.responseText : request.response);
    });
    request.addEventListener("error", (e) => reject(e));
  });
}
__name(loadFile, "loadFile");
async function loadJsonFile(url, progressCallback) {
  const response = await loadFile(url, "text", progressCallback);
  return JSON.parse(response);
}
__name(loadJsonFile, "loadJsonFile");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/tools/scene.js
function getNodeByName(name, scene, container = null) {
  if (container) {
    const node = container.getNodes().find((node2) => node2.name === name);
    if (node) {
      return node;
    }
  } else {
    const node = scene.getNodeByName(name);
    if (node) {
      return node;
    }
  }
  const clusteredLightContainers = scene.lights.filter((light) => isClusteredLightContainer(light));
  for (const clusteredLightContainer of clusteredLightContainers) {
    const lightNode = clusteredLightContainer.lights.find((light) => {
      if (container) {
        return light.name === name && light._parentContainer === container;
      }
      return light.name === name;
    });
    if (lightNode) {
      return lightNode;
    }
  }
  return null;
}
__name(getNodeByName, "getNodeByName");
function getNodeById(id, scene) {
  const node = scene.getNodeById(id);
  if (node) {
    return node;
  }
  const clusteredLightContainers = scene.lights.filter((light) => isClusteredLightContainer(light));
  for (const clusteredLightContainer of clusteredLightContainers) {
    const lightNode = clusteredLightContainer.lights.find((light) => light.id === id);
    if (lightNode) {
      return lightNode;
    }
  }
  return null;
}
__name(getNodeById, "getNodeById");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/tools/ragdoll.js
var import_babylonjs38 = require("babylonjs");
var import_babylonjs39 = require("babylonjs");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/tools/vector.js
var import_babylonjs36 = require("babylonjs");
var import_babylonjs37 = require("babylonjs");
function parseAxis(axis) {
  const vector = import_babylonjs37.Vector3.FromArray(axis);
  if (vector.equals(import_babylonjs36.Axis.X)) {
    return import_babylonjs36.Axis.X;
  }
  if (vector.equals(import_babylonjs36.Axis.Y)) {
    return import_babylonjs36.Axis.Y;
  }
  if (vector.equals(import_babylonjs36.Axis.Z)) {
    return import_babylonjs36.Axis.Z;
  }
  return vector;
}
__name(parseAxis, "parseAxis");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/tools/ragdoll.js
function parseRagdollConfiguration(configuration2) {
  configuration2.runtimeConfiguration.forEach((config) => {
    if (config.rotationAxis) {
      config.rotationAxis = parseAxis(config.rotationAxis);
    }
    if (config.boneOffsetAxis) {
      config.boneOffsetAxis = parseAxis(config.boneOffsetAxis);
    }
  });
  return configuration2;
}
__name(parseRagdollConfiguration, "parseRagdollConfiguration");
function copyAndParseRagdollConfiguration(configuration2) {
  const copy = {
    rootNodeId: configuration2.rootNodeId,
    skeletonName: configuration2.skeletonName,
    scalingFactor: configuration2.scalingFactor,
    runtimeConfiguration: configuration2.runtimeConfiguration.map((config) => ({
      name: config.name,
      bones: config.bones,
      width: config.width,
      depth: config.depth,
      height: config.height,
      size: config.size,
      joint: config.joint,
      min: config.min,
      max: config.max,
      mass: config.mass ?? 1,
      boxOffset: config.boxOffset,
      restitution: config.restitution ?? 0,
      rotationAxis: config.rotationAxis?.slice(),
      boneOffsetAxis: config.boneOffsetAxis?.slice()
    }))
  };
  return parseRagdollConfiguration(copy);
}
__name(copyAndParseRagdollConfiguration, "copyAndParseRagdollConfiguration");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/container/container.js
var import_babylonjs48 = require("babylonjs");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/tools/tools.js
function cloneJSObject(source) {
  if (!source) {
    return source;
  }
  return JSON.parse(JSON.stringify(source));
}
__name(cloneJSObject, "cloneJSObject");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/sound.js
var import_babylonjs40 = require("babylonjs");
var import_babylonjs41 = require("babylonjs");
var import_babylonjs42 = require("babylonjs");
var import_babylonjs43 = require("babylonjs");
var import_babylonjs44 = require("babylonjs");
var import_babylonjs45 = require("babylonjs");
var import_babylonjs46 = require("babylonjs");
var registered2 = false;
var registeredUpdateObserver = null;
var soundInstances = [];
var cachedSoundBuffers = /* @__PURE__ */ new Map();
function createSoundInstance(name, options) {
  const audioEngine = (0, import_babylonjs46._GetAudioEngine)(null);
  return new import_babylonjs45._WebAudioStaticSound(name, audioEngine, options);
}
__name(createSoundInstance, "createSoundInstance");
function registerUpdateSoundsObserver(scene) {
  registeredUpdateObserver?.remove();
  if (!soundInstances.length) {
    return;
  }
  const listenerPosition = import_babylonjs40.Vector3.Zero();
  registeredUpdateObserver = scene.onBeforeRenderObservable.add(() => {
    const listener = (0, import_babylonjs46._GetAudioEngine)(null).listener.attachedNode;
    if (!listener) {
      return;
    }
    listener.getWorldMatrix().getTranslationToRef(listenerPosition);
    soundInstances.forEach((instance) => {
      if (instance.isEnabled(false) && instance.autoUpdateSpatial && instance.sound?._isSpatial && instance.isPlaying() && scene.activeCamera) {
        const distance = import_babylonjs40.Vector3.Distance(listenerPosition, instance.getAbsolutePosition());
        if (distance <= instance.sound.spatial.maxDistance) {
          instance.sound.spatial.update();
        }
      }
    });
  });
}
__name(registerUpdateSoundsObserver, "registerUpdateSoundsObserver");
function registerSoundInstanceCleanup(instance, sound) {
  sound.onDisposeObservable.addOnce(() => {
    const index = soundInstances.indexOf(instance);
    if (index !== -1) {
      soundInstances.splice(index, 1);
    }
  });
}
__name(registerSoundInstanceCleanup, "registerSoundInstanceCleanup");
function registerSoundNodeEvents(instance) {
  if (instance.sound) {
    registerSoundInstanceCleanup(instance, instance.sound);
  }
  instance.onDisposeObservable.addOnce(() => {
    instance.sound?.dispose();
  });
}
__name(registerSoundNodeEvents, "registerSoundNodeEvents");
function loadSoundBuffer(scene, soundAbsolutePath) {
  return new Promise(async (resolve, reject) => {
    if (!scene.offlineProvider || !import_babylonjs41.Database.IDBStorageEnabled) {
      return (0, import_babylonjs46.CreateSoundBufferAsync)(soundAbsolutePath).then((buffer) => resolve(buffer)).catch((e) => reject(e));
    }
    scene.offlineProvider.loadFile(soundAbsolutePath, (data) => {
      (0, import_babylonjs46.CreateSoundBufferAsync)(data).then((buffer) => resolve(buffer)).catch((e) => reject(e));
    }, void 0, () => {
      reject(null);
    }, true);
  });
}
__name(loadSoundBuffer, "loadSoundBuffer");
function configureSourceNodeFrom(source, target) {
  if (!source.soundRelativePath || !source.sound) {
    return;
  }
  target.onSoundLoadedObservable = new import_babylonjs43.Observable();
  const sound = createSoundInstance(source.soundRelativePath, {
    spatialAutoUpdate: false
  });
  sound._initAsync(source.sound.buffer, {
    spatialAutoUpdate: true
  }).then(() => {
    sound.volume = source.volume;
    sound._isSpatial = source.sound._isSpatial;
    if (sound._isSpatial) {
      sound.spatial.attach(target);
      sound.spatial.maxDistance = source.sound.spatial.maxDistance;
      sound.spatial.panningModel = source.sound.spatial.panningModel;
      sound.spatial.distanceModel = source.sound.spatial.distanceModel;
    }
    target.sound = sound;
    target.soundRelativePath = source.soundRelativePath;
    target.autoUpdateSpatial = source.autoUpdateSpatial;
    soundInstances.push(target);
    registerSoundInstanceCleanup(target, sound);
    registerUpdateSoundsObserver(target.getScene());
    target.onSoundLoadedObservable.notifyObservers(target);
  });
  registerSoundNodeEvents(target);
  configureSoundNodePrototype(target, sound);
}
__name(configureSourceNodeFrom, "configureSourceNodeFrom");
function configureSoundNodePrototype(instance, sound) {
  Object.defineProperty(instance, "volume", {
    get: /* @__PURE__ */ __name(() => {
      return sound.volume;
    }, "get"),
    set: /* @__PURE__ */ __name((volume) => {
      sound.volume = volume;
    }, "set")
  });
  Object.defineProperty(instance, "playbackRate", {
    get: /* @__PURE__ */ __name(() => {
      return sound.playbackRate;
    }, "get"),
    set: /* @__PURE__ */ __name((playbackRate) => {
      sound.playbackRate = playbackRate;
    }, "set")
  });
  instance.isPaused = () => sound.state === import_babylonjs42.SoundState.Paused;
  instance.isPlaying = () => sound.state === import_babylonjs42.SoundState.Started;
  instance.isStopped = () => sound.state === import_babylonjs42.SoundState.Stopped;
  instance.pause = () => sound.pause();
  instance.resume = () => sound.resume();
  instance.stop = (options) => sound.stop(options);
  instance.play = (options) => sound.play(options);
  instance.setVolume = (volume, options) => sound.setVolume(volume, options);
  instance.getClassName = () => "SoundNode";
  instance.setSoundSpatial = (spatial) => {
    return new Promise((resolve) => {
      sound._isSpatial = spatial;
      setTimeout(() => {
        if (spatial) {
          sound.spatial.attach(instance);
        }
        resolve();
      });
    });
  };
  instance.cloneAsync = async (name, newParent, doNotCloneChildren) => {
    return new Promise((resolve) => {
      const clone = instance.clone(name, newParent, doNotCloneChildren);
      configureSourceNodeFrom(instance, clone);
      clone.onSoundLoadedObservable.addOnce(() => {
        setTimeout(() => resolve(clone));
      });
    });
  };
}
__name(configureSoundNodePrototype, "configureSoundNodePrototype");
function registerAudioParser() {
  if (registered2) {
    return;
  }
  registered2 = true;
  (0, import_babylonjs44.AddParser)("SoundNode", (parsedData, scene, container, rootUrl) => {
    parsedData.transformNodes?.forEach((transformNode) => {
      if (!transformNode.isSoundNode) {
        return;
      }
      const instance = container.transformNodes?.find((t) => t.id === transformNode.id);
      if (!instance) {
        return;
      }
      if (transformNode.soundRelativePath) {
        const soundAbsolutePath = `${rootUrl}${transformNode.soundRelativePath}`;
        scene.addPendingData(soundAbsolutePath);
        if (!cachedSoundBuffers.has(soundAbsolutePath)) {
          cachedSoundBuffers.set(soundAbsolutePath, loadSoundBuffer(scene, soundAbsolutePath));
        }
        const promise = cachedSoundBuffers.get(soundAbsolutePath);
        promise.then((buffer) => {
          (0, import_babylonjs46.CreateSoundAsync)(transformNode.soundRelativePath, buffer, {
            spatialAutoUpdate: false
          }).then((sound) => {
            scene.removePendingData(soundAbsolutePath);
            if (instance.isDisposed()) {
              return sound.dispose();
            }
            sound.volume = transformNode.volume;
            sound._isSpatial = transformNode.isSpatial;
            if (transformNode.isSpatial) {
              sound.spatial.attach(instance);
              sound.spatial.maxDistance = transformNode.maxDistance;
              sound.spatial.panningModel = transformNode.panningModel;
              sound.spatial.distanceModel = transformNode.distanceModel;
            }
            instance.sound = sound;
            instance.soundRelativePath = transformNode.soundRelativePath;
            instance.autoUpdateSpatial = transformNode.autoUpdateSpatial;
            soundInstances.push(instance);
            registerSoundNodeEvents(instance);
            configureSoundNodePrototype(instance, sound);
            registerUpdateSoundsObserver(scene);
          });
        });
      }
    });
  });
}
__name(registerAudioParser, "registerAudioParser");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/transform-node.js
var import_babylonjs47 = require("babylonjs");
function configureTransformNodes(scene) {
  const computedMaterials = /* @__PURE__ */ new Set();
  const nodes = [...scene.transformNodes, ...scene.meshes];
  nodes.forEach((transformNode) => {
    if (transformNode.metadata?.isStaticGroup) {
      const descendants = transformNode.getDescendants(false);
      descendants.push(transformNode);
      descendants.forEach((node) => {
        if (isAbstractMesh(node) || isTransformNode(node) && !node.isWorldMatrixFrozen) {
          if (node.billboardMode === import_babylonjs47.AbstractMesh.BILLBOARDMODE_NONE) {
            node.freezeWorldMatrix();
          }
        }
        if (isAbstractMesh(node)) {
          const material = node.material;
          if (material && !material.isFrozen && !computedMaterials.has(material)) {
            computedMaterials.add(material);
            material.onBindObservable.addOnce(() => {
              material.freeze();
            });
          }
        }
      });
    }
  });
}
__name(configureTransformNodes, "configureTransformNodes");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/container/entries.js
var AdvancedAssetContainerInstantiatedEntries = class {
  static {
    __name(this, "AdvancedAssetContainerInstantiatedEntries");
  }
  entries;
  namingId;
  constructor(entries, namingId) {
    this.entries = entries;
    this.namingId = namingId;
  }
  /**
   * Returns the list of root nodes of the instantiated container.
   */
  get rootNodes() {
    return this.entries.rootNodes;
  }
  /**
   * Returns the list of all nodes of the instantiated container.
   */
  get skeletons() {
    return this.entries.skeletons;
  }
  /**
   * Returns the list of all animation groups of the instantiated container.
   */
  get animationGroups() {
    return this.entries.animationGroups;
  }
  /**
   * Disposes all the instantiated entries (meshes, skeletons, animation groups)
   */
  dispose() {
    this.entries.dispose();
  }
  /**
   * Retrieve the reference to a root node of the instantiated container by its name.
   * @param name defines the name of the root node to retrieve.
   * @returns the reference to the root node of the instantiated container which matches the given name, or null if not found.
   */
  getRootNodeByName(name) {
    const effectiveName = `${name}-${this.namingId}`;
    return this.entries.rootNodes.find((node) => node.name === effectiveName) ?? null;
  }
  /**
   * Retrieve the reference to a node present in the instantiated container by its name recursively.
   * @param name defines the name of the node to retrieve.
   * @returns the reference to the node of the instantiated container which matches the given name, or null if not found.
   */
  getNodeByName(name) {
    const effectiveName = `${name}-${this.namingId}`;
    for (const node of this.entries.rootNodes) {
      const result = this._recursivelyGetNodeByName(effectiveName, node);
      if (result) {
        return result;
      }
    }
    return null;
  }
  _recursivelyGetNodeByName(name, root) {
    if (root.name === name) {
      return root;
    }
    for (const child of root.getDescendants(true)) {
      const result = this._recursivelyGetNodeByName(name, child);
      if (result) {
        return result;
      }
    }
    return null;
  }
  /**
   * Retrieve the reference to a script instance of the given type attached to a node with the given name.
   * @param name defines the name of the object to retrieve the script from.
   * @param classType defines the class of the type to retrieve.
   * @returns the reference to the script instance attached to the node which matches the given class type.
   */
  getScriptByClassByObjectName(name, classType) {
    const node = this.getNodeByName(name);
    if (node) {
      const scripts = getAllScriptsByClassForObject(node, classType);
      if (scripts?.length === 1) {
        return scripts[0];
      }
    }
    return null;
  }
};

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/container/container.js
var AdvancedAssetContainer = class {
  static {
    __name(this, "AdvancedAssetContainer");
  }
  /**
   * Defines the reference to the
   */
  container;
  _rootUrl;
  _scriptsMap;
  _originalDescendants = [];
  _nodesMap = /* @__PURE__ */ new Map();
  _animationGroupsMap = /* @__PURE__ */ new Map();
  constructor(container, rootUrl, scriptsMap2) {
    this.container = container;
    this._rootUrl = rootUrl;
    this._scriptsMap = scriptsMap2;
    container.populateRootNodes();
    container.rootNodes.forEach((node) => {
      this._originalDescendants.push(node, ...node.getDescendants(false));
    });
    container.animationGroups.forEach((animationGroup) => {
      this._animationGroupsMap.set(animationGroup.name, animationGroup);
    });
    this._originalDescendants.forEach((node) => {
      this._nodesMap.set(node, {
        node,
        metadata: cloneJSObject(node.metadata)
      });
    });
  }
  /**
   * By default, loaded advanced asset containers add their nodes in the scene.
   * As it is not always wanted, this method allows to remove those nodes from the scene and only keep them in the container.
   * This is particularely useful when you want to instantiate the container several times in the scene, but not use the original nodes of the container itself.
   */
  removeDefault() {
    this.container.getNodes().forEach((node) => {
      const scripts = scriptsDictionary.get(node);
      scripts?.forEach((script) => {
        _removeRegisteredScriptInstance(node, script);
      });
    });
    this.container.removeAllFromScene();
  }
  /**
   * Retrieve the reference to a node present in the root nodes of the container by its name.
   * This is useful only if the container is not intended to be instantiated so you never call `.removeDefault()`.
   * @param name defines the name of the root node to retrieve.
   */
  getRootNodeByName(name) {
    return this.container.rootNodes.find((node) => node.name === name) ?? null;
  }
  /**
   * Retrieve the reference to a script instance of the given type attached to a node with the given name.
   * @param name defines the name of the object to retrieve the script from.
   * @param classType defines the class of the type to retrieve.
   * @returns the reference to the script instance attached to the node which matches the given class type.
   */
  getScriptByClassByObjectName(name, classType) {
    const nodes = this.container.getNodes();
    for (const node of nodes) {
      if (node.name === name) {
        const scripts = getAllScriptsByClassForObject(node, classType);
        if (scripts?.length === 1) {
          return scripts[0];
        }
      }
    }
    return null;
  }
  /**
   * Instantiate or clone all meshes, skeletons and animations groups, and add the new ones to the scene.
   * If the container contains scripts attached to its nodes, those scripts will also be applied on the instantiated/cloned nodes.
   * @param options defines an optional list of options to control how to instantiate / clone models
   * @param options.doNotInstantiate defines if the model must be instantiated or just cloned
   * @param options.predicate defines a predicate used to filter whih mesh to instantiate/clone
   * @returns a new reference to instantiated entries with the instantiated nodes, skeletons and animation groups.
   * @see `BABYLON.AssetContainer.instantiateModelsToScene` for options.
   */
  instantiate(options) {
    const namingId = import_babylonjs48.Tools.RandomId();
    const nameFunction = /* @__PURE__ */ __name((sourceName) => sourceName, "nameFunction");
    const entries = this.container.instantiateModelsToScene(nameFunction, false, {
      ...options,
      predicate: /* @__PURE__ */ __name((entity) => {
        entity.name = `${entity.name}@editor-tools@${namingId}_${entity.id}`;
        return options?.predicate?.(entity) ?? true;
      }, "predicate")
    });
    const result = new AdvancedAssetContainerInstantiatedEntries(entries, namingId);
    const allContainerEntries = [
      ...this.container.transformNodes,
      ...this.container.meshes,
      ...this.container.lights,
      ...this.container.cameras,
      ...this.container.animationGroups,
      ...this.container.skeletons
    ];
    allContainerEntries.forEach((entry) => {
      const nameSplit = entry.name.split("@editor-tools@");
      entry.name = nameSplit[0];
    });
    entries.animationGroups.forEach((animationGroup) => {
      const nameSplit = animationGroup.name.split("@editor-tools@");
      animationGroup.name = `${nameSplit[0]}-${namingId}`;
    });
    const newDescendants = [];
    entries.rootNodes.forEach((node) => {
      newDescendants.push(node, ...node.getDescendants(false));
    });
    newDescendants.forEach((newNode) => {
      const nameSplit = newNode.name.split("@editor-tools@");
      const originalId = nameSplit[1].split("_").pop();
      newNode.name = `${nameSplit[0]}-${namingId}`;
      const originalNode = this._originalDescendants.find((n) => n.id === originalId);
      if (isSoundNode(originalNode) && isTransformNode(newNode)) {
        configureSourceNodeFrom(originalNode, newNode);
      }
      newNode.id = import_babylonjs48.Tools.RandomId();
      newNode.metadata = cloneJSObject(this._nodesMap.get(originalNode).metadata);
      newNode.metadata ??= {};
      newNode.metadata.originalId = originalId;
      newDescendants.forEach((node) => {
        node.metadata.scripts?.forEach((script) => {
          const valueKeys = Object.keys(script.values || {});
          valueKeys.forEach((key) => {
            const obj = script.values[key];
            if (obj.type === "entity") {
              if (obj.value === originalId) {
                obj.value = newNode.id;
              }
              if (obj.value === originalNode.name) {
                obj.value = newNode.name;
              }
              const originalAnimationGroup = this._animationGroupsMap.get(obj.value);
              if (originalAnimationGroup) {
                obj.value = `${originalAnimationGroup.name}-${namingId}`;
              }
            }
          });
        });
      });
    });
    newDescendants.forEach((node) => {
      _applyScriptsForObject(this.container.scene, node, this._scriptsMap, {
        namingId,
        rootUrl: this._rootUrl
      });
    });
    configureTransformNodes(this.container.scene);
    return result;
  }
};

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/script/preload/scene.js
var import_babylonjs49 = require("babylonjs");
var import_babylonjs50 = require("babylonjs");
async function preloadSceneScriptAsset(key, rootUrl, scene) {
  const iblIntensity = scene.iblIntensity;
  const environmentIntensity = scene.environmentIntensity;
  const filename = key.split("/").pop();
  const sceneFilename = filename.replace(".scene", ".babylon");
  const container = await (0, import_babylonjs50.LoadAssetContainerAsync)(sceneFilename, scene, {
    rootUrl,
    pluginExtension: ".babylon"
  });
  scene.onDisposeObservable.addOnce(() => {
    container.dispose();
  });
  if (import_babylonjs49.SceneLoaderFlags.ForceFullSceneLoadingForIncremental) {
    scene.meshes.forEach((m) => isMesh(m) && m._checkDelayState());
  }
  container.addAllToScene();
  scene.iblIntensity = iblIntensity;
  scene.environmentIntensity = environmentIntensity;
  configureTransformNodes(scene);
  return container;
}
__name(preloadSceneScriptAsset, "preloadSceneScriptAsset");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/script/preload/common.js
async function preloadCommonScriptAsset(key, rootUrl) {
  return loadJsonFile(`${rootUrl}${key}`);
}
__name(preloadCommonScriptAsset, "preloadCommonScriptAsset");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/script/preload.js
var scriptAssetsCache = /* @__PURE__ */ new Map();
var scriptAssetsParsers = /* @__PURE__ */ new Map();
function registerScriptAssetParser(extension, parser) {
  if (scriptAssetsParsers.has(extension)) {
    console.warn(`A parser for the extension '${extension}' was already registered. It will be overwritten.`);
  }
  scriptAssetsParsers.set(extension, parser);
}
__name(registerScriptAssetParser, "registerScriptAssetParser");
async function _preloadScriptsAssets(rootUrl, scene, scriptsMap2) {
  const nodes = [scene, ...scene.transformNodes, ...scene.meshes, ...scene.lights, ...scene.cameras];
  let sceneAssetsCache = scriptAssetsCache.get(scene);
  if (!sceneAssetsCache) {
    sceneAssetsCache = /* @__PURE__ */ new Map();
    scriptAssetsCache.set(scene, sceneAssetsCache);
  }
  scene.onDisposeObservable.addOnce(() => {
    scriptAssetsCache.delete(scene);
  });
  const scriptNodes = nodes.filter((node) => node.metadata?.scripts?.length).map((node) => node.metadata.scripts).flat();
  scriptNodes.forEach((script) => {
    const ctor = scriptsMap2[script.key]?.default;
    ctor?._SceneAssets?.forEach((asset) => {
      if (!sceneAssetsCache.get(asset.sceneName)) {
        sceneAssetsCache.set(asset.sceneName, null);
      }
    });
    if (script.values) {
      for (const key in script.values) {
        if (!script.values.hasOwnProperty(key)) {
          continue;
        }
        const obj = script.values[key];
        if (obj.type === "asset" && obj.value && !sceneAssetsCache.get(obj.value)) {
          sceneAssetsCache.set(obj.value, null);
        }
      }
    }
  });
  let loadedAssetsCount = 0;
  for (const value of sceneAssetsCache.values()) {
    if (value === null) {
      ++loadedAssetsCount;
    }
  }
  if (loadedAssetsCount === 0) {
    return loadedAssetsCount;
  }
  const promises = [];
  sceneAssetsCache.forEach((_, key) => {
    if (sceneAssetsCache.get(key)) {
      return;
    }
    promises.push(new Promise(async (resolve) => {
      try {
        const extension = key.split(".").pop();
        switch (extension) {
          case "scene":
            const container = await preloadSceneScriptAsset(key, rootUrl, scene);
            scene.onDisposeObservable.addOnce(() => {
              container.dispose();
              sceneAssetsCache.delete(key);
            });
            sceneAssetsCache.set(key, new AdvancedAssetContainer(container, rootUrl, scriptsMap2));
            break;
          default:
            if (scriptAssetsParsers.has(extension)) {
              const parser = scriptAssetsParsers.get(extension);
              sceneAssetsCache.set(key, await parser({ key, rootUrl, scene }));
              break;
            } else {
              sceneAssetsCache.set(key, await preloadCommonScriptAsset(key, rootUrl));
            }
            break;
        }
      } catch (e) {
        console.error(e);
      }
      resolve();
    }));
  });
  await Promise.all(promises);
  return loadedAssetsCount;
}
__name(_preloadScriptsAssets, "_preloadScriptsAssets");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/decorators/apply.js
function formatNameWithId(name, namingId) {
  return namingId ? `${name}-${namingId}` : name;
}
__name(formatNameWithId, "formatNameWithId");
function applyDecorators(scene, object, script, instance, options) {
  const ctor = instance.constructor;
  if (!ctor) {
    return;
  }
  ctor._NodesFromScene?.forEach((params) => {
    instance[params.propertyKey.toString()] = getNodeByName(formatNameWithId(params.nodeName, params.options?.global ? void 0 : options.namingId), scene, params.options?.global ? void 0 : object._parentContainer);
  });
  if (ctor._ComponentsFromScene?.length) {
    scene.getEngine().onBeginFrameObservable.addOnce(() => {
      ctor._ComponentsFromScene?.forEach((params) => {
        const components = [];
        const nodes = [scene, ...scene.transformNodes, ...scene.meshes, ...scene.lights, ...scene.cameras];
        nodes.forEach((node) => {
          const component = getScriptByClassForObject(node, params.componentConstructor);
          if (component) {
            components.push(component);
          }
        });
        if (components.length > 1) {
          throw new Error(`Multiple components of type ${ctor._ComponentsFromScene[0].componentConstructor.name} found in scene for property "${ctor._ComponentsFromScene[0].propertyKey.toString()}".`);
        }
        instance[params.propertyKey.toString()] = components[0] ?? null;
      });
    });
  }
  ctor._NodesFromDescendants?.forEach((params) => {
    const descendant = object.getDescendants?.(params.directDescendantsOnly, (node) => node.name === formatNameWithId(params.nodeName, options.namingId))[0];
    instance[params.propertyKey.toString()] = descendant ?? null;
  });
  ctor._AnimationGroups?.forEach((params) => {
    instance[params.propertyKey.toString()] = scene.getAnimationGroupByName(formatNameWithId(params.animationGroupName, options.namingId));
  });
  ctor._SoundsFromScene?.forEach((params) => {
    const sound = getNodeByName(formatNameWithId(params.soundName, params.options?.global ? void 0 : options.namingId), scene, params.options?.global ? void 0 : object._parentContainer);
    if (sound && isSoundNode(sound)) {
      instance[params.propertyKey.toString()] = sound ?? null;
    }
  });
  (ctor._GuiFromAsset ?? []).map(async (params) => {
    const guiUrl = `${options.rootUrl}assets/${params.pathInAssets}`;
    try {
      const data = await loadJsonFile(guiUrl);
      const gui = import_babylonjs_gui.AdvancedDynamicTexture.CreateFullscreenUI(data.name, true, scene);
      gui.parseSerializedObject(data.content, false);
      instance[params.propertyKey.toString()] = gui;
      params.onGuiCreated?.(instance, gui);
    } catch (e) {
      console.error(`Failed to load GUI from asset: ${guiUrl}`);
      throw e;
    }
  });
  ctor._ParticleSystemsFromScene?.forEach((params) => {
    const particleSystem = scene.particleSystems?.find((particleSystem2) => {
      if (particleSystem2.name !== formatNameWithId(params.particleSystemName, options.namingId)) {
        return false;
      }
      return params.directDescendantsOnly ? particleSystem2.emitter === object : particleSystem2;
    });
    instance[params.propertyKey.toString()] = particleSystem;
  });
  (ctor._VisibleInInspector ?? []).forEach((params) => {
    const propertyKey = params.propertyKey.toString();
    const attachedScripts = script.values;
    if (!attachedScripts) {
      throw new Error(`No values found for script with key "${script.key}".`);
    }
    if (attachedScripts.hasOwnProperty(propertyKey) && attachedScripts[propertyKey].hasOwnProperty("value")) {
      const value = attachedScripts[propertyKey].value;
      switch (params.configuration.type) {
        case "number":
        case "boolean":
        case "keymap":
        case "string":
          instance[propertyKey] = value;
          break;
        case "vector2":
          instance[propertyKey] = import_babylonjs54.Vector2.FromArray(value);
          break;
        case "vector3":
          instance[propertyKey] = import_babylonjs54.Vector3.FromArray(value);
          break;
        case "color3":
          instance[propertyKey] = import_babylonjs52.Color3.FromArray(value);
          break;
        case "color4":
          instance[propertyKey] = import_babylonjs52.Color4.FromArray(value);
          break;
        case "entity":
          const entityType = params.configuration.entityType;
          switch (entityType) {
            case "node":
            case "sound":
              instance[propertyKey] = getNodeById(value, scene) ?? null;
              break;
            case "animationGroup":
              instance[propertyKey] = scene.getAnimationGroupByName(value) ?? null;
              break;
            case "particleSystem":
              instance[propertyKey] = scene.particleSystems?.find((ps) => ps.id === value) ?? null;
              break;
          }
          break;
        case "texture":
          if (value) {
            instance[propertyKey] = import_babylonjs53.Texture.Parse(value, scene, options.rootUrl);
          }
          break;
        case "asset":
          if (value) {
            const assetType = params.configuration.assetType;
            const assetsCache = scriptAssetsCache.get(scene);
            const data = assetsCache.get(value);
            switch (assetType) {
              case "json":
              case "gui":
              case "scene":
              case "navmesh":
              case "cinematic":
                instance[propertyKey] = data;
                break;
              case "ragdoll":
                instance[propertyKey] = copyAndParseRagdollConfiguration(data);
                break;
              case "nodeParticleSystemSet":
                const npss = import_babylonjs55.NodeParticleSystemSet.Parse(data);
                instance[propertyKey] = npss;
                break;
              case "material":
                instance[propertyKey] = import_babylonjs51.Material.Parse(data, scene, options.rootUrl);
                break;
            }
          }
      }
    }
  });
  let pointerObserver = null;
  let keyboardObserver = null;
  if (ctor._PointerEvents?.length) {
    const wrongMeshListener = ctor._PointerEvents.find((params) => params.options.mode === "attachedMeshOnly");
    if (wrongMeshListener && !isAbstractMesh(object)) {
      throw new Error(`@onPointerEvent with mode "attachedMeshOnly" can only be used on scripts attached to meshes (extends AbstractMesh).`);
    }
    const wrongSceneListener = ctor._PointerEvents.find((params) => params.options.mode !== "global");
    if (wrongSceneListener && !isNode(object)) {
      throw new Error(`@onPointerEvent with mode different from "global" can be used only on scripts attached to Node: Mesh, Light, Camera, TransformNode.`);
    }
    pointerObserver = scene.onPointerObservable.add((pointerInfo) => {
      let pickInfo = null;
      ctor._PointerEvents.forEach((params) => {
        if (!params.eventTypes.includes(pointerInfo.type)) {
          return;
        }
        const propertyKey = params.propertyKey.toString();
        if (params.options.mode === "global") {
          return instance[propertyKey]?.(pointerInfo);
        }
        pickInfo = pointerInfo.pickInfo;
        if (!pickInfo) {
          pickInfo = scene.pick(scene.pointerX, scene.pointerY, (m) => {
            return m.isVisible && m.isPickable && m.isEnabled(true) && !m._masterMesh;
          }, false);
        }
        const pickedMesh = pickInfo.pickedMesh;
        if (pickedMesh) {
          if (params.options.mode === "attachedMeshOnly" && pickedMesh === object) {
            return instance[propertyKey]?.(pointerInfo);
          }
          if (params.options.mode === "includeDescendants" && isNode(object)) {
            const descendants = [object, ...object.getDescendants(false)];
            const pickedDescendant = descendants.find((d) => d === pickedMesh);
            if (pickedDescendant) {
              return instance[propertyKey]?.(pointerInfo);
            }
          }
        }
      });
    });
  }
  if (ctor._KeyboardEvents?.length) {
    keyboardObserver = scene.onKeyboardObservable.add((keyboardInfo) => {
      ctor._KeyboardEvents.forEach((params) => {
        if (!params.eventTypes.includes(keyboardInfo.type)) {
          return;
        }
        instance[params.propertyKey.toString()]?.(keyboardInfo);
      });
    });
  }
  if (ctor._SpritesFromSpriteManager?.length) {
    const spriteManagerNode = object;
    if (!isTransformNode(spriteManagerNode) || !spriteManagerNode.isSpriteManager) {
      return console.error(`@spriteFromSpriteManager decorator can only be used on SpriteManagerNode.`);
    }
    if (!spriteManagerNode.spriteManager) {
      return console.error(`SpriteManagerNode "${spriteManagerNode.name}" has no sprite manager assigned.`);
    }
    ctor._SpritesFromSpriteManager?.forEach((params) => {
      const sprite = spriteManagerNode.spriteManager?.sprites.find((s) => s.name === formatNameWithId(params.spriteName, options.namingId)) || null;
      instance[params.propertyKey.toString()] = sprite;
    });
  }
  if (ctor._AnimationsFromSprite?.length) {
    if (!isSprite(object)) {
      return console.error(`@animationFromSprite decorator can only be used in scripts attached on Sprite.`);
    }
    const spriteAnimations = object.metadata?.spriteAnimations;
    if (!spriteAnimations?.length) {
      return console.error(`Sprite "${object.name}" has no sprite animations assigned.`);
    }
    ctor._AnimationsFromSprite.forEach((params) => {
      const animation = spriteAnimations.find((a) => a.name === formatNameWithId(params.animationName, options.namingId));
      if (animation) {
        instance[params.propertyKey.toString()] = animation ?? null;
      } else {
        console.warn(`Sprite animation named "${formatNameWithId(params.animationName, options.namingId)}" not found on sprite "${object.name}".`);
      }
    });
  }
  ctor._SceneAssets?.forEach((params) => {
    const assetsCache = scriptAssetsCache.get(scene);
    instance[params.propertyKey.toString()] = assetsCache.get(params.sceneName);
  });
  return {
    observers: {
      pointerObserver,
      keyboardObserver
    }
  };
}
__name(applyDecorators, "applyDecorators");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/script/apply.js
function _applyScriptsForObject(scene, object, scriptsMap2, options) {
  if (!object.metadata?.scripts) {
    return;
  }
  object.metadata.scripts?.forEach((script) => {
    if (!script.enabled) {
      return;
    }
    const exports2 = scriptsMap2[script.key];
    if (!exports2) {
      return;
    }
    let result = exports2;
    const observers = {};
    if (exports2.default) {
      result = new exports2.default(object);
      const decoratorsResult = applyDecorators(scene, object, script, result, options);
      Object.assign(observers, decoratorsResult?.observers ?? {});
    }
    if (result.onStart) {
      observers.onStartObserver = scene.onBeforeRenderObservable.addOnce(() => result.onStart(object));
    }
    if (result.onUpdate) {
      observers.onUpdateObserver = scene.onBeforeRenderObservable.add(() => result.onUpdate(object));
    }
    _registerScriptInstance(object, result, script.key, observers);
  });
  object.metadata.scripts = void 0;
}
__name(_applyScriptsForObject, "_applyScriptsForObject");
var scriptsDictionary = /* @__PURE__ */ new Map();
function _registerScriptInstance(object, scriptInstance, key, observers) {
  const registeredScript = {
    key,
    observers,
    instance: scriptInstance
  };
  if (!scriptsDictionary.has(object)) {
    scriptsDictionary.set(object, [registeredScript]);
  } else {
    scriptsDictionary.get(object).push(registeredScript);
  }
  if (isNode(object) || isAnyParticleSystem(object) || isScene(object) || isSoundNode(object)) {
    object.onDisposeObservable.addOnce((() => {
      const scripts = scriptsDictionary.get(object)?.slice();
      scripts?.forEach((s) => {
        _removeRegisteredScriptInstance(object, s);
      });
      scriptsDictionary.delete(object);
    }));
  }
}
__name(_registerScriptInstance, "_registerScriptInstance");
function _removeRegisteredScriptInstance(object, registeredScript) {
  registeredScript.observers.onStartObserver?.remove();
  registeredScript.observers.onUpdateObserver?.remove();
  registeredScript.observers.pointerObserver?.remove();
  registeredScript.observers.keyboardObserver?.remove();
  try {
    registeredScript.instance.onStop?.(object);
  } catch (e) {
    console.error(`Failed to call onStop for script ${registeredScript.key} on object ${object}`, e);
  }
  const runningScripts = scriptsDictionary.get(object);
  const index = runningScripts?.indexOf(registeredScript) ?? -1;
  if (index !== -1) {
    runningScripts?.splice(index, 1);
  }
}
__name(_removeRegisteredScriptInstance, "_removeRegisteredScriptInstance");
function getAllScriptsByClassForObject(object, classType) {
  const data = scriptsDictionary.get(object);
  const result = data?.filter((s) => s.instance.constructor === classType);
  return result?.map((r) => r.instance) ?? null;
}
__name(getAllScriptsByClassForObject, "getAllScriptsByClassForObject");
function getScriptByClassForObject(object, classType) {
  const result = getAllScriptsByClassForObject(object, classType);
  return result?.[0] ?? null;
}
__name(getScriptByClassForObject, "getScriptByClassForObject");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/mesh.js
var import_babylonjs56 = require("babylonjs");
var registered3 = false;
function registerMeshParser() {
  if (registered3) {
    return;
  }
  registered3 = true;
  (0, import_babylonjs56.AddParser)("MeshEditorPlugin", (parsedData, _scene, container, _rootUrl) => {
    parsedData.meshes?.forEach((mesh) => {
      mesh.instances?.forEach((instanceData) => {
        const instance = container.meshes?.find((m) => m.id === instanceData.id);
        if (!instance) {
          return;
        }
        if (instanceData.billboardMode !== void 0) {
          instance.billboardMode = instanceData.billboardMode;
        }
      });
    });
  });
}
__name(registerMeshParser, "registerMeshParser");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/texture.js
var import_babylonjs57 = require("babylonjs");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/tools/texture.js
var useKtx2CompressedTextures = false;
function isUsingKtx2CompressedTextures() {
  return useKtx2CompressedTextures;
}
__name(isUsingKtx2CompressedTextures, "isUsingKtx2CompressedTextures");
function _getKtx2TextureName(name) {
  return `${name.substring(0, name.lastIndexOf("."))}.ktx2`;
}
__name(_getKtx2TextureName, "_getKtx2TextureName");
function addExcludedCompressedTexture(engine, textureUrl) {
  if (engine._excludedCompressedTextures && !engine._excludedCompressedTextures?.includes(textureUrl)) {
    engine._excludedCompressedTextures?.push(textureUrl);
  }
}
__name(addExcludedCompressedTexture, "addExcludedCompressedTexture");
function getTextureUrl(sourceProperty, scene) {
  if (scene.loadingTexturesQuality === "high" || !sourceProperty.metadata?.baseSize) {
    return sourceProperty.name;
  }
  const width = sourceProperty.metadata.baseSize.width;
  const height = sourceProperty.metadata.baseSize.height;
  const isPowerOfTwo = width === getPowerOfTwoUntil(width) || height === getPowerOfTwoUntil(height);
  let suffix = "";
  switch (scene.loadingTexturesQuality) {
    case "medium":
      let midWidth = width * 0.66 >> 0;
      let midHeight = height * 0.66 >> 0;
      if (isPowerOfTwo) {
        midWidth = getPowerOfTwoUntil(midWidth);
        midHeight = getPowerOfTwoUntil(midHeight);
      }
      suffix = `_${midWidth}_${midHeight}`;
      break;
    case "low":
    case "very-low":
      let lowWidth = width * 0.33 >> 0;
      let lowHeight = height * 0.33 >> 0;
      if (isPowerOfTwo) {
        lowWidth = getPowerOfTwoUntil(lowWidth);
        lowHeight = getPowerOfTwoUntil(lowHeight);
      }
      suffix = `_${lowWidth}_${lowHeight}`;
      break;
  }
  const name = sourceProperty.name;
  if (!name || !suffix) {
    return sourceProperty.name;
  }
  const finalUrl = name.split("/");
  const filename = finalUrl.pop();
  if (!filename) {
    return sourceProperty.name;
  }
  const extension = filename.split(".").pop();
  const baseFilename = filename.replace(`.${extension}`, "");
  const newFilename = `${baseFilename}${suffix}.${extension}`;
  finalUrl.push(newFilename);
  return finalUrl.join("/");
}
__name(getTextureUrl, "getTextureUrl");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/texture.js
var registered4 = false;
function registerTextureParser() {
  if (registered4) {
    return;
  }
  registered4 = true;
  const textureParser = import_babylonjs57.SerializationHelper._TextureParser;
  import_babylonjs57.SerializationHelper._TextureParser = (sourceProperty, scene, rootUrl) => {
    if (isUsingKtx2CompressedTextures()) {
      if (sourceProperty.name) {
        sourceProperty.name = _getKtx2TextureName(sourceProperty.name);
      }
      if (sourceProperty.url) {
        sourceProperty.url = _getKtx2TextureName(sourceProperty.url);
      }
    }
    const suffix = getTextureUrl(sourceProperty, scene);
    if (!suffix) {
      return textureParser(sourceProperty, scene, rootUrl);
    }
    const originalName = sourceProperty.name;
    sourceProperty.name = suffix;
    const texture = textureParser(sourceProperty, scene, rootUrl);
    if (texture) {
      texture.name = originalName;
    }
    return texture;
  };
}
__name(registerTextureParser, "registerTextureParser");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/sprite-map.js
var import_babylonjs58 = require("babylonjs");
var import_babylonjs59 = require("babylonjs");
var import_babylonjs60 = require("babylonjs");
var import_babylonjs61 = require("babylonjs");
var import_babylonjs62 = require("babylonjs");
var import_babylonjs63 = require("babylonjs");
var import_babylonjs64 = require("babylonjs");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/tools/sprite.js
function normalizeAtlasJson(data) {
  if (!Array.isArray(data.frames)) {
    const frames = [];
    for (const key of Object.keys(data.frames)) {
      frames.push({
        filename: key,
        ...data.frames[key]
      });
    }
    data.frames = frames;
  }
}
__name(normalizeAtlasJson, "normalizeAtlasJson");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/sprite-map.js
var registered5 = false;
function registerSpriteMapParser() {
  if (registered5) {
    return;
  }
  registered5 = true;
  (0, import_babylonjs64.AddParser)("SpriteMapNode", (parsedData, scene, container, rootUrl) => {
    parsedData.transformNodes?.forEach((transformNode) => {
      if (!transformNode.isSpriteMap) {
        return;
      }
      const instance = container.transformNodes?.find((t) => t.id === transformNode.id);
      if (!instance) {
        return;
      }
      instance.isSpriteMap = transformNode.isSpriteMap;
      const atlasJsonAbsolutePath = `${rootUrl}${transformNode.atlasJsonRelativePath}`;
      scene.addPendingData(atlasJsonAbsolutePath);
      const atlasRequest = new import_babylonjs60.WebRequest();
      atlasRequest.open("GET", atlasJsonAbsolutePath);
      atlasRequest.send();
      atlasRequest.addEventListener("load", () => {
        scene.removePendingData(atlasJsonAbsolutePath);
        const atlasJson = JSON.parse(atlasRequest.responseText);
        normalizeAtlasJson(atlasJson);
        const imagePath = `${import_babylonjs58.Tools.GetFolderPath(atlasJsonAbsolutePath)}${atlasJson.meta.image}`;
        const spritesheet = new import_babylonjs62.Texture(imagePath, scene, false, false, import_babylonjs62.Texture.NEAREST_NEAREST, null, null, null, false, import_babylonjs59.Engine.TEXTUREFORMAT_RGBA);
        const spriteMap = new import_babylonjs61.SpriteMap(instance.name, atlasJson, spritesheet, {
          layerCount: transformNode.options.layerCount,
          stageSize: import_babylonjs63.Vector2.FromArray(transformNode.options.stageSize ?? [10, 1]),
          outputSize: import_babylonjs63.Vector2.FromArray(transformNode.options.outputSize ?? [100, 100]),
          colorMultiply: import_babylonjs63.Vector3.FromArray(transformNode.options.colorMultiply ?? [1, 1, 1]),
          flipU: true
        }, scene);
        transformNode.getClassName = () => "SpriteMapNode";
        transformNode.tiles.forEach((tile) => {
          for (let x = 0, lenX = tile.repeatCount.x + 1; x < lenX; ++x) {
            for (let y = 0, lenY = tile.repeatCount.y + 1; y < lenY; ++y) {
              const offsetX = x * (tile.repeatOffset.x + 1);
              const offsetY = y * (tile.repeatOffset.y + 1);
              spriteMap.changeTiles(tile.layer, new import_babylonjs63.Vector2(tile.position.x + offsetX, (spriteMap.options.stageSize?.y ?? 0) - 1 - tile.position.y - offsetY), tile.tile);
            }
          }
        });
        const outputPlane = spriteMap["_output"];
        outputPlane.parent = instance;
        instance.spriteMap = spriteMap;
      });
    });
  });
}
__name(registerSpriteMapParser, "registerSpriteMapParser");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/shadows.js
var import_babylonjs65 = require("babylonjs");
var import_babylonjs66 = require("babylonjs");
var import_babylonjs67 = require("babylonjs");
var import_babylonjs68 = require("babylonjs");
var registered6 = false;
function registerShadowGeneratorParser() {
  if (registered6) {
    return;
  }
  registered6 = true;
  (0, import_babylonjs68.RegisterShadowGeneratorSceneComponent)(import_babylonjs66.ShadowGenerator);
  const shadowsGeneratorParser = (0, import_babylonjs67.GetParser)(import_babylonjs65.SceneComponentConstants.NAME_SHADOWGENERATOR);
  (0, import_babylonjs67.AddParser)("ShadowGeneratorEditorPlugin", (parsedData, scene, container, rootUrl) => {
    const savedShadowGenerators = /* @__PURE__ */ new Map();
    parsedData.shadowGenerators?.forEach((shadowGenerator) => {
      savedShadowGenerators.set(shadowGenerator.id, shadowGenerator.mapSize);
      if (scene.loadingShadowsQuality !== "high") {
        switch (scene.loadingShadowsQuality) {
          case "medium":
            shadowGenerator.mapSize = shadowGenerator.mapSize * 0.5;
            break;
          case "low":
            shadowGenerator.mapSize = shadowGenerator.mapSize * 0.25;
            break;
          case "very-low":
            shadowGenerator.mapSize = shadowGenerator.mapSize * 0.125;
            break;
        }
        shadowGenerator.mapSize = Math.max(128, getPowerOfTwoUntil(shadowGenerator.mapSize));
      }
    });
    shadowsGeneratorParser?.(parsedData, scene, container, rootUrl);
    scene.lights.forEach((light) => {
      const shadowGenerator = light.getShadowGenerator();
      const shadowMap = shadowGenerator?.getShadowMap();
      if (shadowMap) {
        const id = shadowGenerator.id;
        const savedMapSize = savedShadowGenerators.get(id);
        if (savedMapSize) {
          shadowGenerator.originalMapSize = savedMapSize;
        }
      }
    });
  });
}
__name(registerShadowGeneratorParser, "registerShadowGeneratorParser");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/sprite-manager.js
var import_babylonjs69 = require("babylonjs");
var import_babylonjs70 = require("babylonjs");
var import_babylonjs71 = require("babylonjs");
var import_babylonjs72 = require("babylonjs");
var import_babylonjs73 = require("babylonjs");
function parseSerializedSpriteManager(spriteManager, parsedSpriteManager) {
  if (parsedSpriteManager?.fogEnabled !== void 0) {
    spriteManager.fogEnabled = parsedSpriteManager?.fogEnabled;
  }
  if (parsedSpriteManager?.blendMode !== void 0) {
    spriteManager.blendMode = parsedSpriteManager?.blendMode;
  }
  if (parsedSpriteManager?.disableDepthWrite !== void 0) {
    spriteManager.disableDepthWrite = parsedSpriteManager?.disableDepthWrite;
  }
  if (parsedSpriteManager?.pixelPerfect !== void 0) {
    spriteManager.pixelPerfect = parsedSpriteManager?.pixelPerfect;
  }
  if (parsedSpriteManager?.useLogarithmicDepth !== void 0) {
    spriteManager.useLogarithmicDepth = parsedSpriteManager?.useLogarithmicDepth;
  }
  if (parsedSpriteManager?.metadata !== void 0) {
    spriteManager.metadata = parsedSpriteManager?.metadata;
  }
  for (const parsedSprite of parsedSpriteManager?.sprites ?? []) {
    const sprite = import_babylonjs70.Sprite.Parse(parsedSprite, spriteManager);
    sprite.uniqueId = parsedSprite.uniqueId;
    sprite.metadata = parsedSprite.metadata;
  }
}
__name(parseSerializedSpriteManager, "parseSerializedSpriteManager");
var registered7 = false;
function registerSpriteManagerParser() {
  if (registered7) {
    return;
  }
  registered7 = true;
  (0, import_babylonjs73.AddParser)("SpriteManagerNode", (parsedData, scene, container, rootUrl) => {
    parsedData.transformNodes?.forEach((transformNode) => {
      if (!transformNode.isSpriteManager) {
        return;
      }
      const instance = container.transformNodes?.find((t) => t.id === transformNode.id);
      if (!instance) {
        return;
      }
      const engine = scene.getEngine();
      instance.isSpriteManager = transformNode.isSpriteManager;
      if (transformNode.atlasJsonRelativePath) {
        const atlasJsonAbsolutePath = `${rootUrl}${transformNode.atlasJsonRelativePath}`;
        scene.addPendingData(atlasJsonAbsolutePath);
        const request = new import_babylonjs71.WebRequest();
        request.open("GET", atlasJsonAbsolutePath);
        request.send();
        request.addEventListener("load", () => {
          scene.removePendingData(atlasJsonAbsolutePath);
          const atlasJson = JSON.parse(request.responseText);
          const imagePath = `${import_babylonjs69.Tools.GetFolderPath(atlasJsonAbsolutePath)}${atlasJson.meta.image}`;
          addExcludedCompressedTexture(engine, imagePath);
          const spriteManager = new import_babylonjs72.SpriteManager(instance.name, imagePath, 1e3, 64, scene, void 0, void 0, true, atlasJson);
          instance.spriteManager = spriteManager;
          instance.getClassName = () => "SpriteManagerNode";
          if (transformNode.spriteManager) {
            parseSerializedSpriteManager(spriteManager, transformNode.spriteManager);
          }
        });
      } else if (transformNode.spriteManager?.textureUrl) {
        addExcludedCompressedTexture(engine, transformNode.spriteManager.textureUrl);
        const imagePath = `${rootUrl}${transformNode.spriteManager.textureUrl}`;
        const spriteManager = new import_babylonjs72.SpriteManager(instance.name, imagePath, 1e3, {
          width: transformNode.spriteManager.cellWidth,
          height: transformNode.spriteManager.cellHeight
        }, scene, void 0, void 0, false);
        instance.spriteManager = spriteManager;
        instance.getClassName = () => "SpriteManagerNode";
        if (transformNode.spriteManager) {
          parseSerializedSpriteManager(spriteManager, transformNode.spriteManager);
        }
      }
    });
  });
}
__name(registerSpriteManagerParser, "registerSpriteManagerParser");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/morph-target-manager.js
var import_babylonjs74 = require("babylonjs");
var import_babylonjs75 = require("babylonjs");
var registered8 = false;
function registerMorphTargetManagerParser() {
  if (registered8) {
    return;
  }
  registered8 = true;
  (0, import_babylonjs75.AddParser)("MorphTargetManagerEditorPlugin", (parsedData, scene, container, rootUrl) => {
    parsedData.morphTargetManagers.forEach((morphTargetManagerData) => {
      const meshInstance = container.meshes.find((mesh) => {
        return mesh.id === morphTargetManagerData.meshId;
      });
      const morphTargetManager = meshInstance?.morphTargetManager;
      if (!morphTargetManager) {
        return;
      }
      const shouldExit = morphTargetManagerData.targets.find((target) => !target.delayLoadingFile);
      if (shouldExit) {
        return;
      }
      const promises = [];
      morphTargetManagerData.targets.forEach((target) => {
        if (!target.delayLoadingFile) {
          return promises.push(Promise.resolve(null));
        }
        const absolutePath = `${rootUrl}${target.delayLoadingFile}`;
        scene.addPendingData(absolutePath);
        const request = new import_babylonjs74.WebRequest();
        request.responseType = "arraybuffer";
        request.open("GET", absolutePath);
        request.send();
        promises.push(new Promise((resolve) => {
          request.addEventListener("load", () => {
            scene.removePendingData(absolutePath);
            resolve(request.response);
          });
        }));
      });
      Promise.all(promises).then((allBuffers) => {
        for (let i = 0, len = morphTargetManager.numTargets; i < len; ++i) {
          const instancedTarget = morphTargetManager.getTarget(i);
          const sourceTargetData = morphTargetManagerData.targets[i];
          const buffer = allBuffers[i];
          if (sourceTargetData.positionsCount) {
            const positions = new Float32Array(buffer, sourceTargetData.positionsOffset, sourceTargetData.positionsCount);
            instancedTarget["_positions"] = positions;
            instancedTarget.setPositions(positions);
          }
          if (sourceTargetData.normalsCount) {
            const normals = new Float32Array(buffer, sourceTargetData.normalsOffset, sourceTargetData.normalsCount);
            instancedTarget["_normals"] = normals;
            instancedTarget.setNormals(normals);
          }
          if (sourceTargetData.tangentsCount) {
            const tangents = new Float32Array(buffer, sourceTargetData.tangentsOffset, sourceTargetData.tangentsCount);
            instancedTarget["_tangents"] = tangents;
            instancedTarget.setTangents(tangents);
          }
          if (sourceTargetData.uvsCount) {
            const uvs = new Float32Array(buffer, sourceTargetData.uvsOffset, sourceTargetData.uvsCount);
            instancedTarget["_uvs"] = uvs;
            instancedTarget.setUVs(uvs);
          }
          if (sourceTargetData.uv2sCount) {
            const uv2s = new Float32Array(buffer, sourceTargetData.uv2sOffset, sourceTargetData.uv2sCount);
            instancedTarget["_uv2s"] = uv2s;
            instancedTarget.setUV2s(uv2s);
          }
        }
        for (let i = 0, len = morphTargetManager.numTargets; i < len; ++i) {
          const instancedTarget = morphTargetManager.getTarget(i);
          instancedTarget._onDataLayoutChanged.notifyObservers();
        }
      });
    });
  });
}
__name(registerMorphTargetManagerParser, "registerMorphTargetManagerParser");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/node-particle-system-set.js
var import_babylonjs76 = require("babylonjs");
var import_babylonjs77 = require("babylonjs");
var registered9 = false;
function registerNodeParticleSystemSetParser() {
  if (registered9) {
    return;
  }
  registered9 = true;
  (0, import_babylonjs76.AddParser)("NodeParticleSystemSetEditorPlugin", (parsedData, scene, container, rootUrl) => {
    parsedData.meshes?.forEach((mesh) => {
      if (!mesh.isNodeParticleSystemMesh) {
        return;
      }
      const instance = container.meshes?.find((m) => m.id === mesh.id);
      if (!instance) {
        return;
      }
      mesh.nodeParticleSystemSet.blocks?.forEach((block) => {
        if (block.url) {
          block.url = `${rootUrl}${block.url}`;
        }
      });
      instance.nodeParticleSystemSet = import_babylonjs77.NodeParticleSystemSet.Parse(mesh.nodeParticleSystemSet);
      instance.nodeParticleSystemSet.id = mesh.nodeParticleSystemSet.id;
      instance.nodeParticleSystemSet.uniqueId = mesh.uniqueId;
      scene.addPendingData(mesh.id);
      instance.nodeParticleSystemSet.buildAsync(scene, false).then((particleSystemSet) => {
        scene.removePendingData(mesh.id);
        instance.particleSystemSet = particleSystemSet;
        particleSystemSet.systems.forEach((particleSystem) => {
          if (isParticleSystem(particleSystem)) {
            const sizeCreationProcess = particleSystem._sizeCreation.process;
            if (sizeCreationProcess) {
              particleSystem._sizeCreation.process = (particle, system) => {
                sizeCreationProcess(particle, system);
                particle.scale.x *= 100;
                particle.scale.y *= 100;
              };
            }
          }
        });
        particleSystemSet.emitterNode = instance;
        particleSystemSet.start();
      });
    });
  });
}
__name(registerNodeParticleSystemSetParser, "registerNodeParticleSystemSetParser");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/light.js
var import_babylonjs78 = require("babylonjs");
function configureLights(scene, clusteredLightContainer) {
  clusteredLightContainer ??= new import_babylonjs78.ClusteredLightContainer("Clustered Light Container", [], scene);
  const clusteredLight = scene.metadata?.clusteredLight;
  if (clusteredLight) {
    if (clusteredLight.lights.length > 0) {
      clusteredLightContainer.horizontalTiles = clusteredLight.horizontalTiles;
      clusteredLightContainer.verticalTiles = clusteredLight.verticalTiles;
      clusteredLightContainer.depthSlices = clusteredLight.depthSlices;
      clusteredLightContainer.maxRange = clusteredLight.maxRange;
    }
    clusteredLight.lights.forEach((lightId) => {
      const light = scene.getLightById(lightId);
      if (light) {
        clusteredLightContainer?.addLight(light);
      }
    });
  }
  return clusteredLightContainer;
}
__name(configureLights, "configureLights");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/loader.js
var sceneConfigurationMap = /* @__PURE__ */ new Map();
async function waitForWaitingItems(scene, onProgress) {
  const waitingItemsCount = scene.getWaitingItemsCount();
  while (!scene.isDisposed && (!scene.isReady() || scene.getWaitingItemsCount() > 0)) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const loadedItemsCount = waitingItemsCount - scene.getWaitingItemsCount();
    if (loadedItemsCount === waitingItemsCount) {
      scene.textures.forEach((texture) => {
        if (texture.delayLoadState === import_babylonjs80.Constants.DELAYLOADSTATE_NONE) {
          texture.delayLoadState = import_babylonjs80.Constants.DELAYLOADSTATE_LOADED;
        }
      });
    }
    onProgress(loadedItemsCount / waitingItemsCount);
  }
}
__name(waitForWaitingItems, "waitForWaitingItems");
async function loadScene(rootUrl, sceneFilename, scene, scriptsMap2, options) {
  scene.loadingQuality = options?.quality ?? "high";
  scene.loadingTexturesQuality = options?.texturesQuality ?? scene.loadingQuality;
  scene.loadingShadowsQuality = options?.shadowsQuality ?? scene.loadingQuality;
  scene.loadingLodsQuality = options?.lodsQuality ?? scene.loadingQuality;
  registerMeshParser();
  registerAudioParser();
  registerTextureParser();
  registerShadowGeneratorParser();
  registerMorphTargetManagerParser();
  registerSpriteMapParser();
  registerSpriteManagerParser();
  registerNodeParticleSystemSetParser();
  const configuration2 = sceneConfigurationMap.get(scene) ?? {};
  sceneConfigurationMap.set(scene, configuration2);
  scene.onDisposeObservable.addOnce(() => {
    sceneConfigurationMap.delete(scene);
  });
  await (0, import_babylonjs81.AppendSceneAsync)(`${rootUrl}${sceneFilename}`, scene, {
    pluginExtension: ".babylon",
    onProgress: /* @__PURE__ */ __name((event) => {
      const progress = Math.min(event.loaded / event.total * 0.5);
      options?.onProgress?.(progress);
    }, "onProgress")
  });
  await waitForWaitingItems(scene, (progress) => {
    options?.onProgress?.(0.5 + progress * 0.25);
  });
  if (!options?.skipAssetsPreload) {
    let loadedAssetsCount = 0;
    do {
      loadedAssetsCount = await _preloadScriptsAssets(rootUrl, scene, scriptsMap2);
    } while (loadedAssetsCount !== 0 && !scene.isDisposed);
  }
  if (import_babylonjs82.SceneLoaderFlags.ForceFullSceneLoadingForIncremental) {
    scene.meshes.forEach((m) => isMesh(m) && m._checkDelayState());
  }
  const clusteredLightContainer = configureLights(scene, configuration2.clusteredLightContainer);
  configuration2.clusteredLightContainer = clusteredLightContainer;
  await waitForWaitingItems(scene, (progress) => {
    options?.onProgress?.(0.75 + progress * 0.25);
  });
  options?.onProgress?.(1);
  configureMeshDistanceOrScreenCoverage(scene);
  applyMeshesLODQuality(scene.loadingLodsQuality, scene);
  configureShadowMapRenderListPredicate(scene);
  configureShadowMapRefreshRate(scene);
  if (scene.metadata?.rendering) {
    applyRenderingConfigurations(scene, scene.metadata);
    if (scene.activeCamera) {
      applyRenderingConfigurationForCamera(scene.activeCamera, rootUrl, options?.postProcessConfiguration);
    }
  }
  if (scene.metadata?.physicsGravity) {
    scene.getPhysicsEngine()?.setGravity(import_babylonjs79.Vector3.FromArray(scene.metadata?.physicsGravity));
  }
  _applyScriptsForObject(scene, scene, scriptsMap2, {
    rootUrl
  });
  scene.transformNodes.forEach((transformNode) => {
    _applyScriptsForObject(scene, transformNode, scriptsMap2, {
      rootUrl
    });
  });
  scene.meshes.forEach((mesh) => {
    configurePhysicsAggregate(mesh);
    _applyScriptsForObject(scene, mesh, scriptsMap2, {
      rootUrl
    });
  });
  scene.lights.forEach((light) => {
    _applyScriptsForObject(scene, light, scriptsMap2, {
      rootUrl
    });
  });
  clusteredLightContainer.lights.forEach((light) => {
    _applyScriptsForObject(scene, light, scriptsMap2, {
      rootUrl
    });
  });
  scene.cameras.forEach((camera) => {
    _applyScriptsForObject(scene, camera, scriptsMap2, {
      rootUrl
    });
  });
  scene.spriteManagers?.forEach((spriteManager) => {
    spriteManager.sprites.forEach((sprite) => {
      _applyScriptsForObject(scene, sprite, scriptsMap2, {
        rootUrl
      });
    });
  });
  configureTransformNodes(scene);
}
__name(loadScene, "loadScene");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/material.js
var import_babylonjs83 = require("babylonjs");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/tools/animation.js
var import_babylonjs84 = require("babylonjs");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/tools/particle.js
var import_babylonjs85 = require("babylonjs");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/cinematic/parse.js
var import_babylonjs87 = require("babylonjs");
var import_babylonjs88 = require("babylonjs");
var import_babylonjs89 = require("babylonjs");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/cinematic/tools.js
var import_babylonjs86 = require("babylonjs");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/cinematic/generate.js
var import_babylonjs93 = require("babylonjs");
var import_babylonjs94 = require("babylonjs");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/cinematic/events/apply-impulse.js
var import_babylonjs90 = require("babylonjs");
var zeroVector = import_babylonjs90.Vector3.Zero();

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/cinematic/cinematic.js
var import_babylonjs91 = require("babylonjs");
var import_babylonjs92 = require("babylonjs");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/database/database.js
var import_babylonjs95 = require("babylonjs");

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/database/preload.js
var supportedSoundExtensions = ["mp3", "wav"];
var supportedGeometryExtensions = ["babylonbinarymeshdata"];
var supportedJsonExtensions = ["babylon", "json"];
var supportedImageExtensions = ["jpg", "jpeg", "png", "bmp", "webp"];
var supportedBinaryExtensions = ["bin", "ktx", "ktx2", ...supportedGeometryExtensions, ...supportedSoundExtensions];
var allSupportedExtensions = [...supportedJsonExtensions, ...supportedImageExtensions, ...supportedBinaryExtensions];

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/gaussian-splatting.js
var import_babylonjs96 = require("babylonjs");
var import_babylonjs97 = require("babylonjs");
var import_babylonjs98 = require("babylonjs");
var import_babylonjs99 = require("babylonjs");
var registered10 = false;
function registerGaussianSplattingParser() {
  if (registered10) {
    return;
  }
  registered10 = true;
  let compountMesh = null;
  (0, import_babylonjs96.AddParser)("GaussianSplattingMeshEditorPlugin", (parsedData, scene, container, rootUrl) => {
    const maxGaussianSplattingPartCount = (0, import_babylonjs99.GetGaussianSplattingMaxPartCount)(scene.getEngine());
    parsedData.meshes?.forEach((mesh) => {
      if (mesh.type !== "GaussianSplattingMesh" || !mesh.splatDataPath) {
        return;
      }
      const instantiatedMesh = container.meshes.find((m) => m.id === mesh.id);
      if (!instantiatedMesh) {
        return;
      }
      instantiatedMesh.dispose(true);
      const splatDataUrl = rootUrl + mesh.splatDataPath;
      const shDataUrls = mesh.shDataPaths?.map((shData) => rootUrl + shData);
      scene.addPendingData(splatDataUrl);
      shDataUrls?.forEach((shDataUrl) => {
        scene.addPendingData(shDataUrl);
      });
      const promises = [loadFile(splatDataUrl, "arraybuffer")];
      shDataUrls?.forEach((shDataUrl) => {
        promises.push(loadFile(shDataUrl, "arraybuffer"));
      });
      Promise.all(promises).then(([splatData, ...shDataArray]) => {
        mesh.splatsData = splatData;
        mesh.shData = shDataArray?.map((buffer) => new Uint8Array(buffer));
        const parsedMesh = import_babylonjs97.GaussianSplattingMesh.Parse(mesh, scene);
        parsedMesh.id = mesh.id;
        parsedMesh.uniqueId = mesh.uniqueId;
        scene.removeMesh(parsedMesh);
        mesh.proxies.forEach((proxy) => {
          compountMesh ??= new import_babylonjs98.GaussianSplattingCompoundMesh("GaussianSplattingCompoundMesh", void 0, scene);
          if (compountMesh.partCount >= maxGaussianSplattingPartCount) {
            return;
          }
          const proxyMesh = compountMesh.addPart(parsedMesh, false);
          proxyMesh.name = proxy.name;
          proxyMesh.id = proxy.id;
          proxyMesh.uniqueId = proxy.uniqueId;
          proxyMesh.metadata = proxy.metadata ?? {};
          proxyMesh.metadata._waitingParentId = proxy.metadata?.parentId;
          proxyMesh.setEnabled(proxy.isEnabled ?? true);
          if (proxy.position) {
            proxyMesh.position.copyFromFloats(proxy.position[0], proxy.position[1], proxy.position[2]);
          }
          if (proxy.rotation) {
            proxyMesh.rotation.copyFromFloats(proxy.rotation[0], proxy.rotation[1], proxy.rotation[2]);
          }
          if (proxy.rotationQuaternion) {
            proxyMesh.rotationQuaternion?.copyFromFloats(proxy.rotationQuaternion[0], proxy.rotationQuaternion[1], proxy.rotationQuaternion[2], proxy.rotationQuaternion[3]);
          }
          if (proxy.scaling) {
            proxyMesh.scaling.copyFromFloats(proxy.scaling[0], proxy.scaling[1], proxy.scaling[2]);
          }
          if (proxy.parentId) {
            const parent = container.getNodes().find((n) => n.id === proxy.parentId);
            if (parent) {
              proxyMesh.parent = parent;
            } else {
              proxyMesh._waitingParentId = proxy.parentId;
            }
          }
        });
        scene.removePendingData(splatDataUrl);
        shDataUrls?.forEach((shDataUrl) => {
          scene.removePendingData(shDataUrl);
        });
      });
    });
  });
}
__name(registerGaussianSplattingParser, "registerGaussianSplattingParser");
registerGaussianSplattingParser();

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/script/preload/plugins/gui.js
var import_babylonjs_gui2 = require("babylonjs-gui");
async function preloadFullScreenScriptAsset(parameters) {
  const data = await loadJsonFile(`${parameters.rootUrl}${parameters.key}`);
  let gui = null;
  try {
    switch (data.guiType) {
      case "fullscreen":
        gui = import_babylonjs_gui2.AdvancedDynamicTexture.CreateFullscreenUI(data.name, true, parameters.scene);
        gui.parseSerializedObject(data.content, false, (url) => `${parameters.rootUrl}${url}`);
        break;
      default:
        throw new Error(`Unknown GUI type: ${data.guiType}`);
    }
  } catch (e) {
    console.error(`Failed to load GUI asset '${parameters.key}'. Make sure you imported all @babylonjs/gui modules required by this GUI asset.`);
    console.error(e);
  }
  return gui;
}
__name(preloadFullScreenScriptAsset, "preloadFullScreenScriptAsset");
registerScriptAssetParser("gui", preloadFullScreenScriptAsset);

// ../../../../OneDrive/Documentos/Midron/node_modules/babylonjs-editor-tools/build/src/loading/script/preload/plugins/navmesh.js
var import_babylonjs_addons = require("babylonjs-addons");
async function preloadNavMeshScriptAsset(parameters) {
  const [config, navmeshData, tilesData] = await Promise.all([
    loadJsonFile(`${parameters.rootUrl}${parameters.key}/config.json`),
    loadFile(`${parameters.rootUrl}${parameters.key}/navmesh.bin`, "arraybuffer"),
    loadFile(`${parameters.rootUrl}${parameters.key}/tilecache.bin`, "arraybuffer")
  ]);
  const [recastCore, recastGenerators] = await Promise.all([require("@recast-navigation/core"), require("@recast-navigation/generators")]);
  const recast = await (0, import_babylonjs_addons.CreateNavigationPluginAsync)({
    instance: {
      ...recastCore,
      ...recastGenerators
    }
  });
  recast.buildFromNavmeshData(new Uint8Array(navmeshData));
  recast.buildFromTileCacheData(new Uint8Array(tilesData));
  parameters.scene.onDisposeObservable.addOnce(() => {
    recast.dispose();
  });
  const createdObstacles = [];
  recast.refreshObstacles = function() {
    createdObstacles.forEach((obstacle) => recast.removeObstacle(obstacle));
    createdObstacles.splice(0, createdObstacles.length);
    config.obstacleMeshes.forEach((obstacle) => {
      const node = getNodeById(obstacle.id, parameters.scene);
      if (!isAbstractMesh(node)) {
        return;
      }
      const position = node.getAbsolutePosition();
      const boundingBox = node.getBoundingInfo().boundingBox;
      switch (obstacle.type) {
        case "box":
          const boxObstacle = recast.addBoxObstacle(position, boundingBox.extendSizeWorld, obstacle.angle);
          if (boxObstacle) {
            createdObstacles.push(boxObstacle);
          }
          break;
        case "cylinder":
          const cylinderObstacle = recast.addCylinderObstacle(position, boundingBox.extendSizeWorld.x, boundingBox.extendSizeWorld.y);
          if (cylinderObstacle) {
            createdObstacles.push(cylinderObstacle);
          }
          break;
      }
    });
  };
  recast.refreshObstacles();
  return recast;
}
__name(preloadNavMeshScriptAsset, "preloadNavMeshScriptAsset");
registerScriptAssetParser("navmesh", preloadNavMeshScriptAsset);

// ../../../../OneDrive/Documentos/Midron/src/scripts/Dron.ts
var Dron_exports = {};
__export(Dron_exports, {
  default: () => DronComponent
});
var BABYLON = __toESM(require("babylonjs"));
var GUI = __toESM(require("babylonjs-gui"));
var DronComponent = class {
  constructor(mesh) {
    this.mesh = mesh;
  }
  static {
    __name(this, "DronComponent");
  }
  onStart() {
    const scene = this.mesh.getScene ? this.mesh.getScene() : this.mesh;
    const canvas = scene.getEngine().getRenderingCanvas();
    scene.clearColor = new BABYLON.Color4(0.1, 0.12, 0.16, 1);
    scene.ambientColor = new BABYLON.Color3(0.15, 0.16, 0.18);
    scene.lights.forEach((l) => {
      if (l.name !== "studioKey" && l.name !== "studioFill" && l.name !== "studioRim") {
        l.intensity = 0.25;
      }
    });
    const camera = new BABYLON.ArcRotateCamera("dronWorkCam", -Math.PI / 2, Math.PI / 2.7, 1.35, new BABYLON.Vector3(0, 0.18, 0), scene);
    if (canvas) {
      camera.attachControl(canvas, true);
    }
    camera.wheelPrecision = 40;
    camera.lowerRadiusLimit = 0.25;
    camera.upperRadiusLimit = 3.2;
    camera.lowerBetaLimit = 0.15;
    camera.upperBetaLimit = Math.PI / 2 - 0.05;
    scene.activeCamera = camera;
    const studioKey = new BABYLON.DirectionalLight("studioKey", new BABYLON.Vector3(-1.2, -2.5, 1), scene);
    studioKey.position = new BABYLON.Vector3(3.5, 7, -3.5);
    studioKey.intensity = 1.1;
    const studioFill = new BABYLON.DirectionalLight("studioFill", new BABYLON.Vector3(1.5, -1.8, -1.2), scene);
    studioFill.position = new BABYLON.Vector3(-4, 5, 4);
    studioFill.intensity = 0.65;
    const studioRim = new BABYLON.HemisphericLight("studioRim", new BABYLON.Vector3(0, 1, 0), scene);
    studioRim.intensity = 0.65;
    studioRim.diffuse = new BABYLON.Color3(0.92, 0.94, 0.98);
    studioRim.groundColor = new BABYLON.Color3(0.18, 0.2, 0.24);
    const hl = new BABYLON.HighlightLayer("hl_dron", scene);
    const carbonMat = new BABYLON.PBRMaterial("carbonMat", scene);
    carbonMat.metallic = 0.4;
    carbonMat.roughness = 0.35;
    carbonMat.albedoColor = new BABYLON.Color3(0.08, 0.08, 0.09);
    const carbonTex = new BABYLON.DynamicTexture("carbonTex", 256, scene, false);
    const cCtx = carbonTex.getContext();
    for (let x = 0; x < 256; x += 16) {
      for (let y = 0; y < 256; y += 16) {
        const isEven = (x / 16 + y / 16) % 2 === 0;
        cCtx.fillStyle = isEven ? "#141518" : "#222428";
        cCtx.fillRect(x, y, 16, 16);
      }
    }
    carbonTex.update();
    carbonMat.albedoTexture = carbonTex;
    const redCncMat = new BABYLON.PBRMaterial("redCncMat", scene);
    redCncMat.metallic = 0.88;
    redCncMat.roughness = 0.22;
    redCncMat.albedoColor = new BABYLON.Color3(0.85, 0.08, 0.12);
    const steelMat = new BABYLON.PBRMaterial("steelMat", scene);
    steelMat.metallic = 0.95;
    steelMat.roughness = 0.2;
    steelMat.albedoColor = new BABYLON.Color3(0.82, 0.84, 0.88);
    const copperMat = new BABYLON.PBRMaterial("copperMat", scene);
    copperMat.metallic = 0.9;
    copperMat.roughness = 0.28;
    copperMat.albedoColor = new BABYLON.Color3(0.92, 0.45, 0.15);
    const brassMat = new BABYLON.PBRMaterial("brassMat", scene);
    brassMat.metallic = 0.85;
    brassMat.roughness = 0.3;
    brassMat.albedoColor = new BABYLON.Color3(0.92, 0.78, 0.22);
    const polymerMat = new BABYLON.PBRMaterial("polymerMat", scene);
    polymerMat.metallic = 0.05;
    polymerMat.roughness = 0.65;
    polymerMat.albedoColor = new BABYLON.Color3(0.12, 0.13, 0.15);
    const lipoMat = new BABYLON.PBRMaterial("lipoMat", scene);
    lipoMat.metallic = 0.1;
    lipoMat.roughness = 0.4;
    lipoMat.albedoColor = new BABYLON.Color3(0.08, 0.25, 0.68);
    const lipoLabelMat = new BABYLON.StandardMaterial("lipoLabelMat", scene);
    const lTex = new BABYLON.DynamicTexture("lTex", 512, scene, false);
    const lCtx = lTex.getContext();
    lCtx.fillStyle = "#ffb300";
    lCtx.fillRect(0, 0, 512, 512);
    lCtx.fillStyle = "#000000";
    lCtx.font = "bold 44px Arial";
    lCtx.fillText("LiPo 3S 11.1V", 40, 90);
    lCtx.font = "bold 70px Arial";
    lCtx.fillText("5000 mAh", 40, 180);
    lCtx.font = "bold 38px Arial";
    lCtx.fillText("35C DISCHARGE (175A)", 40, 250);
    lCtx.fillText("55.5 Wh \u2022 XT60", 40, 310);
    lTex.update();
    lipoLabelMat.diffuseTexture = lTex;
    const tankMat = new BABYLON.PBRMaterial("tankMat", scene);
    tankMat.metallic = 0.3;
    tankMat.roughness = 0.25;
    tankMat.albedoColor = new BABYLON.Color3(0.85, 0.06, 0.08);
    const propCwMat = new BABYLON.PBRMaterial("propCwMat", scene);
    propCwMat.metallic = 0.5;
    propCwMat.roughness = 0.3;
    propCwMat.albedoColor = new BABYLON.Color3(0.98, 0.45, 0.05);
    const propCcwMat = new BABYLON.PBRMaterial("propCcwMat", scene);
    propCcwMat.metallic = 0.5;
    propCcwMat.roughness = 0.3;
    propCcwMat.albedoColor = new BABYLON.Color3(0.05, 0.65, 0.98);
    const workbenchRoot = new BABYLON.TransformNode("workbenchRoot", scene);
    const tableTop = BABYLON.MeshBuilder.CreateBox("tableTop", { width: 2.5, height: 0.045, depth: 1.6 }, scene);
    tableTop.position.set(0, -0.023, 0);
    tableTop.parent = workbenchRoot;
    const woodMat = new BABYLON.PBRMaterial("woodMat", scene);
    woodMat.metallic = 0.05;
    woodMat.roughness = 0.65;
    const woodTex = new BABYLON.DynamicTexture("woodTex", 512, scene, false);
    const wCtx = woodTex.getContext();
    wCtx.fillStyle = "#9c7a52";
    wCtx.fillRect(0, 0, 512, 512);
    wCtx.fillStyle = "rgba(70, 48, 25, 0.18)";
    for (let i = 0; i < 512; i += 8) {
      wCtx.fillRect(0, i, 512, 4);
    }
    woodTex.update();
    woodMat.albedoTexture = woodTex;
    tableTop.material = woodMat;
    const esdMat = BABYLON.MeshBuilder.CreatePlane("esdMat", { width: 1.05, height: 0.75 }, scene);
    esdMat.rotation.x = Math.PI / 2;
    esdMat.position.set(0, 1e-3, 0.02);
    esdMat.parent = workbenchRoot;
    const esdTexture = new BABYLON.DynamicTexture("esdTexture", 512, scene, false);
    const eCtx = esdTexture.getContext();
    eCtx.fillStyle = "#162846";
    eCtx.fillRect(0, 0, 512, 512);
    eCtx.strokeStyle = "rgba(0, 229, 255, 0.4)";
    eCtx.lineWidth = 1.5;
    for (let g = 0; g <= 512; g += 32) {
      eCtx.beginPath();
      eCtx.moveTo(g, 0);
      eCtx.lineTo(g, 512);
      eCtx.stroke();
      eCtx.beginPath();
      eCtx.moveTo(0, g);
      eCtx.lineTo(512, g);
      eCtx.stroke();
    }
    eCtx.fillStyle = "#00e5ff";
    eCtx.font = "bold 16px monospace";
    eCtx.fillText("BANCO DE PRUEBAS AEROESPACIAL \u2022 ZD550", 25, 35);
    eCtx.fillText("METRIC ESD GRID 10mm", 25, 495);
    esdTexture.update();
    const esdMaterial = new BABYLON.PBRMaterial("esdMaterial", scene);
    esdMaterial.metallic = 0.1;
    esdMaterial.roughness = 0.5;
    esdMaterial.albedoTexture = esdTexture;
    esdMat.material = esdMaterial;
    function makeTray(x, z, w, d) {
      const tray = BABYLON.MeshBuilder.CreateBox("tray", { width: w, height: 0.016, depth: d }, scene);
      tray.position.set(x, 8e-3, z);
      tray.parent = workbenchRoot;
      tray.material = steelMat;
      return tray;
    }
    __name(makeTray, "makeTray");
    makeTray(-0.85, -0.32, 0.45, 0.35);
    makeTray(-0.85, 0.32, 0.45, 0.35);
    makeTray(0.85, -0.32, 0.45, 0.35);
    makeTray(0.85, 0.32, 0.45, 0.35);
    const showroomPedestal = BABYLON.MeshBuilder.CreateCylinder("showroomPedestal", { diameter: 0.92, height: 0.015, tessellation: 64 }, scene);
    showroomPedestal.position.set(0, 0.01, 0.02);
    const pedestalMat = new BABYLON.PBRMaterial("pedestalMat", scene);
    pedestalMat.metallic = 0.1;
    pedestalMat.roughness = 0.3;
    pedestalMat.albedoColor = new BABYLON.Color3(0.96, 0.97, 0.99);
    showroomPedestal.material = pedestalMat;
    showroomPedestal.setEnabled(false);
    showroomPedestal.isVisible = false;
    const droneRoot = new BABYLON.TransformNode("droneRoot", scene);
    droneRoot.position.set(0, 0.16, 0.02);
    let activePrototypeId = "zd550";
    let PARTS = [];
    function buildDroneComponents(protoType) {
      droneRoot.getChildren().forEach((c) => c.dispose());
      PARTS = [];
      const isHexa = protoType === "tarot680";
      const armCount = isHexa ? 6 : 4;
      const armRadius = isHexa ? 0.34 : 0.275;
      const bottomGroup = new BABYLON.TransformNode("bottomGroup", scene);
      bottomGroup.parent = droneRoot;
      const plateC = BABYLON.MeshBuilder.CreateCylinder("plateC", { diameter: isHexa ? 0.28 : 0.24, height: 3e-3, tessellation: isHexa ? 12 : 8 }, scene);
      plateC.material = carbonMat;
      plateC.parent = bottomGroup;
      const pcbLayer = BABYLON.MeshBuilder.CreateCylinder("pcbLayer", { diameter: isHexa ? 0.24 : 0.2, height: 15e-4, tessellation: isHexa ? 12 : 8 }, scene);
      pcbLayer.position.y = 2e-3;
      const pcbMat = new BABYLON.PBRMaterial("pcbMat", scene);
      pcbMat.metallic = 0.3;
      pcbMat.roughness = 0.4;
      pcbMat.albedoColor = new BABYLON.Color3(0.08, 0.42, 0.18);
      pcbLayer.material = pcbMat;
      pcbLayer.parent = bottomGroup;
      for (let b = 0; b < armCount; b++) {
        const ang0 = b * Math.PI * 2 / armCount;
        const clamp = BABYLON.MeshBuilder.CreateBox("clamp_" + b, { width: 0.038, height: 0.016, depth: 0.028 }, scene);
        clamp.position.set(Math.cos(ang0) * 0.085, 9e-3, Math.sin(ang0) * 0.085);
        clamp.rotation.y = -ang0 + Math.PI / 2;
        clamp.material = redCncMat;
        clamp.parent = bottomGroup;
        [-0.012, 0.012].forEach((sx, si) => {
          const bolt = BABYLON.MeshBuilder.CreateCylinder("bolt_" + b + "_" + si, { diameter: 55e-4, height: 4e-3 }, scene);
          bolt.position.set(clamp.position.x + sx * 0.5, 0.018, clamp.position.z);
          bolt.material = steelMat;
          bolt.parent = bottomGroup;
        });
      }
      PARTS.push({
        id: 1,
        key: "chasis_inf",
        category: "ESTRUCTURA Y DISTRIBUCI\xD3N EL\xC9CTRICA",
        shortTag: "\u{1F4D0} CHASIS INF. + PDB",
        name: isHexa ? "Chasis Central Tarot 680 Hexa + PDB 250A" : "Placa Inferior ZD550 3K + PDB 160A",
        material: "Fibra de Carbono 3K (2.0mm) + Placa Cobre FR-4 Grado Militar",
        specs: { peso: "285g", corrienteMax: "160A", rigidez: "Torsi\xF3n > 12 Nm/\xB0", tornilleria: "16x Tornillos M3x8mm Titanio Grado 5" },
        desc: "Placa portante estructural que canaliza la distribuci\xF3n de alta potencia y sujeta los brazos.",
        errorReal: "Si se usa un chasis de baja rigidez o fibra barata (G10), la vibraci\xF3n de los motores saturar\xE1 los giroscopios del autopiloto, haciendo imposible el vuelo estacionario. Adem\xE1s, una PDB sin filtro LC inducir\xE1 ruido el\xE9ctrico severo.",
        group: bottomGroup,
        benchPos: new BABYLON.Vector3(-0.85, 0.025, -0.32),
        assembledPos: new BABYLON.Vector3(0, 0, 0),
        inspectPos: new BABYLON.Vector3(-0.15, 0.25, -0.2),
        isAssembled: false
      });
      const armGroup = new BABYLON.TransformNode("armGroup", scene);
      armGroup.parent = droneRoot;
      for (let b = 0; b < armCount; b++) {
        const ang = b * Math.PI * 2 / armCount;
        const aNode = new BABYLON.TransformNode("armNode_" + b, scene);
        aNode.parent = armGroup;
        const tube = BABYLON.MeshBuilder.CreateCylinder("armTube_" + b, { height: isHexa ? 0.28 : 0.22, diameter: 0.02, tessellation: 20 }, scene);
        tube.rotation.z = Math.PI / 2;
        tube.position.x = isHexa ? 0.14 : 0.11;
        tube.material = carbonMat;
        tube.parent = aNode;
        const mount = BABYLON.MeshBuilder.CreateCylinder("mount_" + b, { diameter: 0.055, height: 8e-3, tessellation: 20 }, scene);
        mount.position.set(isHexa ? 0.28 : 0.22, 5e-3, 0);
        mount.material = redCncMat;
        mount.parent = aNode;
        const esc = BABYLON.MeshBuilder.CreateBox("esc_" + b, { width: 0.055, height: 0.012, depth: 0.026 }, scene);
        esc.position.set(0.12, -0.014, 0);
        esc.material = steelMat;
        esc.parent = aNode;
        aNode.rotation.y = ang;
      }
      PARTS.push({
        id: 2,
        key: "brazos_esc",
        category: "PROPULSI\xD3N Y VARIADORES DE VELOCIDAD",
        shortTag: `\u{1F962} ${armCount} BRAZOS + ESCs 40A`,
        name: `${armCount} Brazos Tubulares \xD820mm + Variadores ESC BLHeli_32`,
        material: "Fibra de Carbono Mate 3K Tejido Twill + Abrazaderas CNC 6061-T6",
        specs: { tubos: `${armCount}x \xD820mm x 220mm`, esc: "40A Continuo / 55A Pico (3-6S DShot1200)", frecuencia: "48 kHz PWM", peso: `${armCount * 45}g` },
        desc: "Alojan el cableado interno y los ESC con disipador de aluminio y protocolo digital DShot.",
        errorReal: "Si los ESCs no soportan la corriente pico (m\xEDnimo 40A) o pierden sincronizaci\xF3n (desync), un motor se apagar\xE1 en pleno vuelo, provocando la p\xE9rdida total de control y colisi\xF3n instant\xE1nea.",
        group: armGroup,
        benchPos: new BABYLON.Vector3(0.85, 0.025, -0.32),
        assembledPos: new BABYLON.Vector3(0, 0, 0),
        inspectPos: new BABYLON.Vector3(0.15, 0.25, -0.2),
        isAssembled: false
      });
      const motorGroup = new BABYLON.TransformNode("motorGroup", scene);
      motorGroup.parent = droneRoot;
      for (let b = 0; b < armCount; b++) {
        const ang = b * Math.PI * 2 / armCount;
        const mNode = new BABYLON.TransformNode("mNode_" + b, scene);
        mNode.parent = motorGroup;
        mNode.position.set(Math.cos(ang) * armRadius, 0.014, Math.sin(ang) * armRadius);
        const base = BABYLON.MeshBuilder.CreateCylinder("base_" + b, { diameter: 0.05, height: 6e-3 }, scene);
        base.material = steelMat;
        base.parent = mNode;
        for (let c = 0; c < 12; c++) {
          const ca = c * Math.PI * 2 / 12;
          const coil = BABYLON.MeshBuilder.CreateCylinder("coil_" + b + "_" + c, { diameter: 9e-3, height: 0.014 }, scene);
          coil.position.set(Math.cos(ca) * 0.018, 8e-3, Math.sin(ca) * 0.018);
          coil.material = copperMat;
          coil.parent = mNode;
        }
        const bell = BABYLON.MeshBuilder.CreateCylinder("bell_" + b, { diameter: 0.052, height: 0.019 }, scene);
        bell.position.y = 0.015;
        bell.material = redCncMat;
        bell.parent = mNode;
        const shaft = BABYLON.MeshBuilder.CreateCylinder("shaft_" + b, { diameter: 6e-3, height: 0.028 }, scene);
        shaft.position.y = 0.025;
        shaft.material = steelMat;
        shaft.parent = mNode;
      }
      PARTS.push({
        id: 3,
        key: "motores",
        category: "PLANTA MOTRIZ ELECTROMAGN\xC9TICA",
        shortTag: `\u2699\uFE0F ${armCount} MOTORES 5010 750KV`,
        name: `${armCount} Motores Brushless Outrunner 5010 750KV Grado Industrial`,
        material: "Cuerpo Aluminio 7075-T6 + 14 Imanes Neodimio N45SH + Hilo Cobre OFC",
        specs: { kv: "750 RPM/V", potencia: "550W / motor", empujeMax: `${armCount * 1250}g total`, corrientePico: "35A por motor", rodamientos: "Japoneses NMB" },
        desc: "Produce tracci\xF3n constante. Imanes curvos para m\xEDnimo cogging y m\xE1xima eficiencia g/W.",
        errorReal: "Si se montan motores con KV excesivo (>950KV) con palas de 12'', demandar\xE1n m\xE1s de 45A, quemando el esmalte del bobinado de cobre por sobretemperatura. Si el KV es insuficiente (<500KV con 3S), el dron no lograr\xE1 levantar el vuelo.",
        group: motorGroup,
        benchPos: new BABYLON.Vector3(-0.85, 0.025, 0.32),
        assembledPos: new BABYLON.Vector3(0, 0, 0),
        inspectPos: new BABYLON.Vector3(-0.15, 0.28, -0.15),
        isAssembled: false
      });
      const fcGroup = new BABYLON.TransformNode("fcGroup", scene);
      fcGroup.parent = droneRoot;
      const fcCase = BABYLON.MeshBuilder.CreateBox("fcCase", { width: 0.05, height: 0.016, depth: 0.082 }, scene);
      fcCase.position.set(0, 0.016, 0);
      fcCase.material = polymerMat;
      fcCase.parent = fcGroup;
      const mast = BABYLON.MeshBuilder.CreateCylinder("gpsMast", { diameter: 6e-3, height: 0.14 }, scene);
      mast.position.set(0.045, 0.08, -0.045);
      mast.material = carbonMat;
      mast.parent = fcGroup;
      const gpsPuck = BABYLON.MeshBuilder.CreateCylinder("gpsPuck", { diameter: 0.048, height: 0.014 }, scene);
      gpsPuck.position.set(0.045, 0.15, -0.045);
      gpsPuck.material = polymerMat;
      gpsPuck.parent = fcGroup;
      PARTS.push({
        id: 4,
        key: "pixhawk_gps",
        category: "AVI\xD3NICA Y CONTROL DE NAVEGACI\xD3N",
        shortTag: "\u{1F9E0} PIXHAWK + GPS NEO-M8N",
        name: "Autopiloto de Vuelo Pixhawk 2.4.8 + M\xE1stil GPS/Br\xFAjula M8N",
        material: "Carcasa Policarbonato UL94-V0 Antivibraci\xF3n + Antena Parche Cer\xE1mica",
        specs: { procesador: "STM32F427 32-bit Cortex M4 (168 MHz)", imu: "MPU6000 + L3GD20 + LSM303D", barometro: "MS5611 (10cm precisi\xF3n)", puertos: "CAN, I2C, UART, Telemetr\xEDa" },
        desc: "Cerebro de control aut\xF3nomo con triple redundancia de sensores y posicionamiento satelital.",
        errorReal: "Si el m\xE1stil del GPS no est\xE1 elevado a m\xE1s de 10cm de los cables de alta potencia de la bater\xEDa, el campo electromagn\xE9tico corromper\xE1 el comp\xE1s digital (Compass EKF Error), provocando que el dron vuele err\xE1tico en 'Fly-Away'.",
        group: fcGroup,
        benchPos: new BABYLON.Vector3(0.85, 0.025, 0.32),
        assembledPos: new BABYLON.Vector3(0, 0, 0),
        inspectPos: new BABYLON.Vector3(0.15, 0.28, -0.15),
        isAssembled: false
      });
      const structGroup = new BABYLON.TransformNode("structGroup", scene);
      structGroup.parent = droneRoot;
      const topPlate = BABYLON.MeshBuilder.CreateCylinder("topPlate", { diameter: isHexa ? 0.26 : 0.22, height: 2e-3, tessellation: isHexa ? 12 : 8 }, scene);
      topPlate.position.set(0, 0.045, 0);
      topPlate.material = carbonMat;
      topPlate.parent = structGroup;
      [
        { x: -0.095, z: 0.08 },
        { x: -0.095, z: -0.08 },
        { x: 0.095, z: 0.08 },
        { x: 0.095, z: -0.08 }
      ].forEach((l, i) => {
        const leg = BABYLON.MeshBuilder.CreateCylinder("leg_" + i, { diameter: 0.012, height: 0.22 }, scene);
        leg.position.set(l.x, -0.105, l.z);
        leg.rotation.z = l.x < 0 ? 0.32 : -0.32;
        leg.material = carbonMat;
        leg.parent = structGroup;
        const tClamp = BABYLON.MeshBuilder.CreateBox("tclamp_" + i, { width: 0.02, height: 0.02, depth: 0.02 }, scene);
        tClamp.position.set(l.x * 1.35, -0.21, l.z);
        tClamp.material = redCncMat;
        tClamp.parent = structGroup;
      });
      [-0.13, 0.13].forEach((sx, idx) => {
        const skid = BABYLON.MeshBuilder.CreateCylinder("skid_" + idx, { diameter: 0.014, height: 0.36 }, scene);
        skid.rotation.x = Math.PI / 2;
        skid.position.set(sx, -0.21, 0);
        skid.material = carbonMat;
        skid.parent = structGroup;
      });
      PARTS.push({
        id: 5,
        key: "chasis_sup",
        category: "PROTECCI\xD3N ESTRUCTURAL Y TREN DE ATERRIZAJE",
        shortTag: "\u{1F9BE} CHASIS SUP. + PATAS",
        name: "Placa Superior 3K + Tren de Aterrizaje Reforzado",
        material: "Placa Carbono 1.5mm + Tubos \xD812mm / \xD814mm Neopreno Antichoques",
        specs: { despejeSuelo: "190mm para payload", peso: "195g", absorcion: "Espuma EPDM 55 Shore A", uniones: "Abrazaderas T en Aluminio 6061" },
        desc: "Protege la electr\xF3nica interna y proporciona 19cm de despeje para el tanque extintor.",
        errorReal: "Si el tren de aterrizaje es demasiado bajo (<15cm), el tanque de qu\xEDmico golpear\xE1 el suelo en tomas duras. Sin amortiguaci\xF3n el\xE1stica, el choque mec\xE1nico disparar\xE1 el sensor de colisi\xF3n 'Crash Check' del firmware apagando motores.",
        group: structGroup,
        benchPos: new BABYLON.Vector3(-0.48, 0.025, 0.42),
        assembledPos: new BABYLON.Vector3(0, 0, 0),
        inspectPos: new BABYLON.Vector3(0, 0.32, -0.18),
        isAssembled: false
      });
      const battGroup = new BABYLON.TransformNode("battGroup", scene);
      battGroup.parent = droneRoot;
      const batt = BABYLON.MeshBuilder.CreateBox("battery", { width: 0.052, height: 0.038, depth: 0.145 }, scene);
      batt.position.set(0, 0.065, 0);
      batt.material = lipoMat;
      batt.parent = battGroup;
      const bLabel = BABYLON.MeshBuilder.CreateBox("bLabel", { width: 0.053, height: 0.03, depth: 0.082 }, scene);
      bLabel.position.set(0, 0.065, 0);
      bLabel.material = lipoLabelMat;
      bLabel.parent = battGroup;
      const xt60 = BABYLON.MeshBuilder.CreateBox("xt60", { width: 0.018, height: 0.011, depth: 0.018 }, scene);
      xt60.position.set(0, 0.082, 0.098);
      const xt60Mat = new BABYLON.PBRMaterial("xt60Mat", scene);
      xt60Mat.albedoColor = new BABYLON.Color3(0.95, 0.8, 0.05);
      xt60.material = xt60Mat;
      xt60.parent = battGroup;
      PARTS.push({
        id: 6,
        key: "bateria_pila",
        category: "ALMACENAMIENTO DE ENERG\xCDA Y POTENCIA",
        shortTag: "\u{1F50B} BATER\xCDA (PILA) LiPo 3S",
        name: "Bater\xEDa de Pol\xEDmero de Litio (Pila Principal) 3S 5000mAh",
        material: "3 Celdas LiCoO2 en Serie + Cables Silicona 12AWG + Conector XT60 Oro",
        specs: { voltaje: "11.1V Nominal (12.6V M\xE1x)", capacidad: "5000 mAh (55.5 Wh)", descarga: "35C Continua (175A) / 70C R\xE1faga (350A)", peso: "420g", resistencia: "< 3.2 m\u03A9 por celda" },
        desc: "Pila de alta descarga capaz de alimentar los motores a pleno r\xE9gimen durante m\xE1s de 18-22 minutos.",
        errorReal: "Si se instala una bater\xEDa con baja tasa de descarga (<25C), sufrir\xE1 ca\xEDda brusca de tensi\xF3n (Voltage Sag) al acelerar fuertemente, activando el corte de seguridad por bater\xEDa baja (Battery Failsafe) antes de completar la misi\xF3n.",
        group: battGroup,
        benchPos: new BABYLON.Vector3(0.48, 0.025, 0.42),
        assembledPos: new BABYLON.Vector3(0, 0, 0),
        inspectPos: new BABYLON.Vector3(0.12, 0.28, -0.15),
        isAssembled: false
      });
      const payloadGroup = new BABYLON.TransformNode("payloadGroup", scene);
      payloadGroup.parent = droneRoot;
      const tankVol = isHexa ? 0.24 : 0.19;
      const tank = BABYLON.MeshBuilder.CreateCylinder("tank", { diameter: 0.095, height: tankVol }, scene);
      tank.rotation.z = Math.PI / 2;
      tank.position.set(0, -0.075, 0);
      tank.material = tankMat;
      tank.parent = payloadGroup;
      [-0.06, 0.06].forEach((nz, idx) => {
        const noz = BABYLON.MeshBuilder.CreateCylinder("noz_" + idx, { diameterTop: 8e-3, diameterBottom: 0.015, height: 0.035 }, scene);
        noz.position.set(0, -0.14, nz);
        noz.material = brassMat;
        noz.parent = payloadGroup;
      });
      PARTS.push({
        id: 7,
        key: "tanque_extintor",
        category: "CARGA \xDATIL / PAYLOAD EXTINTOR",
        shortTag: isHexa ? "\u{1F9EF} TANQUE EXTINTOR 2.0L" : "\u{1F9EF} TANQUE EXTINTOR 1.2L",
        name: isHexa ? "Sistema Extintor Presurizado 2.0L AFFF" : "Tanque de Retardante Forestal 1.2L + Boquillas TeeJet",
        material: "Aluminio 5052-H32 Ep\xF3xico + V\xE1lvula Solenoide 12V + Lat\xF3n Naval C36000",
        specs: { volumen: isHexa ? "2.0 Litros" : "1.2 Litros", presion: "4.0 Bar (Nitr\xF3geno Seco)", boquillas: "2x Abanico Plano 110\xB0 TeeJet", pesoLleno: isHexa ? "2.45 kg" : "1.48 kg" },
        desc: "Dispersa cortina de espuma retardante qu\xEDmica para supresi\xF3n inmediata de l\xEDneas de fuego.",
        errorReal: "Si el tanque carece de deflectores internos anti-oleaje (anti-slosh), el l\xEDquido en movimiento desplazar\xE1 violentamente el Centro de Gravedad (CoG), haciendo que el autopiloto pierda estabilidad y entre en oscilaci\xF3n incontrolada.",
        group: payloadGroup,
        benchPos: new BABYLON.Vector3(-0.48, 0.025, -0.45),
        assembledPos: new BABYLON.Vector3(0, 0, 0),
        inspectPos: new BABYLON.Vector3(0, 0.25, -0.18),
        isAssembled: false
      });
      const propGroup = new BABYLON.TransformNode("propGroup", scene);
      propGroup.parent = droneRoot;
      for (let b = 0; b < armCount; b++) {
        const ang = b * Math.PI * 2 / armCount;
        const pNode = new BABYLON.TransformNode("propNode_" + b, scene);
        pNode.parent = propGroup;
        pNode.position.set(Math.cos(ang) * armRadius, 0.044, Math.sin(ang) * armRadius);
        const isCw = b % 2 === 0;
        const tipMat = isCw ? propCwMat : propCcwMat;
        const hub = BABYLON.MeshBuilder.CreateCylinder("hub_" + b, { diameter: 0.024, height: 0.014 }, scene);
        hub.material = carbonMat;
        hub.parent = pNode;
        const blade1 = BABYLON.MeshBuilder.CreateBox("blade1_" + b, { width: 0.14, height: 3e-3, depth: 0.024 }, scene);
        blade1.position.x = 0.075;
        blade1.rotation.y = isCw ? -0.25 : 0.25;
        blade1.material = carbonMat;
        blade1.parent = pNode;
        const tip1 = BABYLON.MeshBuilder.CreateBox("tip1_" + b, { width: 0.035, height: 35e-4, depth: 0.02 }, scene);
        tip1.position.x = 0.13;
        tip1.rotation.y = isCw ? -0.25 : 0.25;
        tip1.material = tipMat;
        tip1.parent = pNode;
        const blade2 = BABYLON.MeshBuilder.CreateBox("blade2_" + b, { width: 0.14, height: 3e-3, depth: 0.024 }, scene);
        blade2.position.x = -0.075;
        blade2.rotation.y = isCw ? -0.25 : 0.25;
        blade2.material = carbonMat;
        blade2.parent = pNode;
        const tip2 = BABYLON.MeshBuilder.CreateBox("tip2_" + b, { width: 0.035, height: 35e-4, depth: 0.02 }, scene);
        tip2.position.x = -0.13;
        tip2.rotation.y = isCw ? -0.25 : 0.25;
        tip2.material = tipMat;
        tip2.parent = pNode;
        const nut = BABYLON.MeshBuilder.CreateCylinder("nut_" + b, { diameterTop: 3e-3, diameterBottom: 0.018, height: 0.02 }, scene);
        nut.position.y = 0.012;
        nut.material = redCncMat;
        nut.parent = pNode;
      }
      PARTS.push({
        id: 8,
        key: "helices",
        category: "AERODIN\xC1MICA Y VECTOR DE EMPUJE",
        shortTag: `\u{1F300} ${armCount} H\xC9LICES 12x4.5"`,
        name: `Juego de ${armCount} H\xE9lices 12x4.5" CW (Naranja) y CCW (Azul)`,
        material: "Fibra de Carbono Compuesta Reforzada + Tuercas Bala M6 Al 7075",
        specs: { pasoDiametro: '12" de Di\xE1metro x 4.5" de Paso', traccionNominal: "1150g @ 6500 RPM", perfil: "Clark-Y Aerodin\xE1mico", balanceo: "Din\xE1mico ISO G2.5" },
        desc: "Giro alternado (horario y antihorario) para cancelar el torque reactivo en vuelo.",
        errorReal: "Si se invierte el sentido de giro de una h\xE9lice (poner CW en lugar de CCW), ese motor empujar\xE1 hacia el suelo en vez de hacia arriba, provocando un volteo catastr\xF3fico inmediato al despegar ('Flip of Death').",
        group: propGroup,
        benchPos: new BABYLON.Vector3(0.48, 0.025, -0.45),
        assembledPos: new BABYLON.Vector3(0, 0, 0),
        inspectPos: new BABYLON.Vector3(0, 0.28, -0.15),
        isAssembled: false
      });
      create3DLabels();
      resetWorkbench();
    }
    __name(buildDroneComponents, "buildDroneComponents");
    const ui = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    let labelControls = [];
    function create3DLabels() {
      labelControls.forEach((l) => l.rect.dispose());
      labelControls = [];
      PARTS.forEach((part) => {
        const labelAnchor = new BABYLON.TransformNode("labelAnchor_" + part.id, scene);
        labelAnchor.parent = part.group;
        labelAnchor.position.set(0, 0.14, 0);
        const tagRect = new GUI.Rectangle("tag_" + part.id);
        tagRect.width = "210px";
        tagRect.height = "28px";
        tagRect.cornerRadius = 6;
        tagRect.thickness = 1.5;
        tagRect.color = "#00e5ff";
        tagRect.background = "rgba(6, 14, 30, 0.94)";
        tagRect.isPointerBlocker = true;
        tagRect.hoverCursor = "pointer";
        const tagText = new GUI.TextBlock();
        tagText.text = part.shortTag;
        tagText.color = "#ffffff";
        tagText.fontSize = 11;
        tagText.fontStyle = "bold";
        tagRect.addControl(tagText);
        tagRect.onPointerEnterObservable.add(() => {
          tagRect.background = "rgba(0, 160, 220, 0.98)";
        });
        tagRect.onPointerOutObservable.add(() => {
          tagRect.background = "rgba(6, 14, 30, 0.94)";
        });
        tagRect.onPointerClickObservable.add(() => {
          openPartInspectionScreen(part);
        });
        ui.addControl(tagRect);
        tagRect.linkWithMesh(labelAnchor);
        labelControls.push({ rect: tagRect, part });
      });
    }
    __name(create3DLabels, "create3DLabels");
    let isMoving = false;
    function animateHandAssemble(part, onComplete) {
      if (isMoving) return;
      isMoving = true;
      const startPos = part.group.position.clone();
      const midPos = part.inspectPos;
      const endPos = part.assembledPos;
      const startTime = performance.now();
      const duration = 1050;
      hl.removeAllMeshes();
      part.group.getChildMeshes().forEach((m) => hl.addMesh(m, BABYLON.Color3.FromHexString("#00e5ff")));
      showInspectionCard(part);
      const obs = scene.onBeforeRenderObservable.add(() => {
        const elapsed = performance.now() - startTime;
        const t = Math.min(elapsed / duration, 1);
        if (t < 0.45) {
          const subT = t / 0.45;
          const ease = subT < 0.5 ? 2 * subT * subT : 1 - Math.pow(-2 * subT + 2, 2) / 2;
          part.group.position = BABYLON.Vector3.Lerp(startPos, midPos, ease);
        } else {
          const subT = (t - 0.45) / 0.55;
          const ease = subT < 0.5 ? 2 * subT * subT : 1 - Math.pow(-2 * subT + 2, 2) / 2;
          part.group.position = BABYLON.Vector3.Lerp(midPos, endPos, ease);
        }
        if (t >= 1) {
          part.group.position.copyFrom(endPos);
          part.isAssembled = true;
          scene.onBeforeRenderObservable.remove(obs);
          isMoving = false;
          setTimeout(() => hl.removeAllMeshes(), 400);
          updateLabelsVisibility();
          if (onComplete) onComplete();
        }
      });
    }
    __name(animateHandAssemble, "animateHandAssemble");
    function disassemblePart(part) {
      if (isMoving || !part.isAssembled) return;
      isMoving = true;
      const startPos = part.group.position.clone();
      const endPos = part.benchPos;
      const startTime = performance.now();
      const duration = 750;
      const obs = scene.onBeforeRenderObservable.add(() => {
        const elapsed = performance.now() - startTime;
        const t = Math.min(elapsed / duration, 1);
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        part.group.position = BABYLON.Vector3.Lerp(startPos, endPos, ease);
        if (t >= 1) {
          part.group.position.copyFrom(endPos);
          part.isAssembled = false;
          scene.onBeforeRenderObservable.remove(obs);
          isMoving = false;
          updateLabelsVisibility();
          updateHUD();
        }
      });
    }
    __name(disassemblePart, "disassemblePart");
    function resetWorkbench() {
      PARTS.forEach((p) => {
        p.group.position.copyFrom(p.benchPos);
        p.isAssembled = false;
      });
      hl.removeAllMeshes();
      updateLabelsVisibility();
      updateHUD();
    }
    __name(resetWorkbench, "resetWorkbench");
    function updateLabelsVisibility() {
      labelControls.forEach((item) => {
        item.rect.isVisible = !item.part.isAssembled;
      });
    }
    __name(updateLabelsVisibility, "updateLabelsVisibility");
    let isIsolatedInspection = false;
    let currentInspectIndex = 0;
    let lastWorkshopCamTarget = new BABYLON.Vector3(0, 0.18, 0);
    let lastWorkshopCamRadius = 1.35;
    let lastWorkshopCamAlpha = -Math.PI / 2;
    let lastWorkshopCamBeta = Math.PI / 2.7;
    const showroomRoot = new GUI.Rectangle("showroomRoot");
    showroomRoot.width = "100%";
    showroomRoot.height = "100%";
    showroomRoot.thickness = 0;
    showroomRoot.background = "transparent";
    showroomRoot.isPointerBlocker = false;
    showroomRoot.isVisible = false;
    ui.addControl(showroomRoot);
    const topBanner = new GUI.Rectangle("topBanner");
    topBanner.width = "100%";
    topBanner.height = "48px";
    topBanner.top = "46px";
    topBanner.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    topBanner.background = "rgba(4, 8, 20, 0.94)";
    topBanner.thickness = 0;
    topBanner.isPointerBlocker = false;
    showroomRoot.addControl(topBanner);
    const btnBackToWorkshop = new GUI.Rectangle("btnBackToWorkshop");
    btnBackToWorkshop.width = "220px";
    btnBackToWorkshop.height = "36px";
    btnBackToWorkshop.cornerRadius = 6;
    btnBackToWorkshop.background = "#059669";
    btnBackToWorkshop.color = "#34d399";
    btnBackToWorkshop.thickness = 1.5;
    btnBackToWorkshop.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    btnBackToWorkshop.left = "20px";
    btnBackToWorkshop.isPointerBlocker = true;
    btnBackToWorkshop.hoverCursor = "pointer";
    const txtBack = new GUI.TextBlock();
    txtBack.text = "\u2190 Volver a la Mesa (Taller)";
    txtBack.color = "white";
    txtBack.fontSize = 11;
    txtBack.fontStyle = "bold";
    txtBack.isHitTestVisible = false;
    btnBackToWorkshop.addControl(txtBack);
    topBanner.addControl(btnBackToWorkshop);
    const txtBreadcrumb = new GUI.TextBlock();
    txtBreadcrumb.text = "ESTUDIO DEDICADO DE COMPONENTE 3D";
    txtBreadcrumb.color = "#00e5ff";
    txtBreadcrumb.fontSize = 12;
    txtBreadcrumb.fontStyle = "bold";
    txtBreadcrumb.isHitTestVisible = false;
    txtBreadcrumb.isPointerBlocker = false;
    topBanner.addControl(txtBreadcrumb);
    let isLightBg = true;
    const btnToggleBg = new GUI.Rectangle("btnToggleBg");
    btnToggleBg.width = "175px";
    btnToggleBg.height = "32px";
    btnToggleBg.cornerRadius = 6;
    btnToggleBg.background = "#ffffff";
    btnToggleBg.color = "#00e5ff";
    btnToggleBg.thickness = 1.5;
    btnToggleBg.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    btnToggleBg.left = "-20px";
    btnToggleBg.isPointerBlocker = true;
    btnToggleBg.hoverCursor = "pointer";
    const txtToggleBg = new GUI.TextBlock();
    txtToggleBg.text = "\u2600\uFE0F Fondo Blanco Activo";
    txtToggleBg.color = "#0f172a";
    txtToggleBg.fontSize = 11;
    txtToggleBg.fontStyle = "bold";
    btnToggleBg.addControl(txtToggleBg);
    topBanner.addControl(btnToggleBg);
    btnToggleBg.onPointerClickObservable.add(() => {
      isLightBg = !isLightBg;
      if (isLightBg) {
        scene.clearColor = new BABYLON.Color4(0.93, 0.95, 0.98, 1);
        txtToggleBg.text = "\u2600\uFE0F Fondo Blanco Activo";
        txtToggleBg.color = "#0f172a";
        btnToggleBg.background = "#ffffff";
        pedestalMat.albedoColor = new BABYLON.Color3(0.96, 0.97, 0.99);
      } else {
        scene.clearColor = new BABYLON.Color4(0.12, 0.15, 0.2, 1);
        txtToggleBg.text = "\u{1F319} Fondo Oscuro Activo";
        txtToggleBg.color = "#ffffff";
        btnToggleBg.background = "#1e293b";
        pedestalMat.albedoColor = new BABYLON.Color3(0.2, 0.24, 0.3);
      }
    });
    const btnNavPrev = new GUI.Rectangle("btnNavPrev");
    btnNavPrev.width = "54px";
    btnNavPrev.height = "80px";
    btnNavPrev.cornerRadius = 10;
    btnNavPrev.background = "rgba(6, 14, 30, 0.88)";
    btnNavPrev.color = "#00e5ff";
    btnNavPrev.thickness = 1.5;
    btnNavPrev.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    btnNavPrev.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    btnNavPrev.left = "24px";
    btnNavPrev.isPointerBlocker = true;
    btnNavPrev.hoverCursor = "pointer";
    const txtNavPrev = new GUI.TextBlock();
    txtNavPrev.text = "\u276E";
    txtNavPrev.color = "#00e5ff";
    txtNavPrev.fontSize = 28;
    btnNavPrev.addControl(txtNavPrev);
    showroomRoot.addControl(btnNavPrev);
    const btnNavNext = new GUI.Rectangle("btnNavNext");
    btnNavNext.width = "54px";
    btnNavNext.height = "80px";
    btnNavNext.cornerRadius = 10;
    btnNavNext.background = "rgba(6, 14, 30, 0.88)";
    btnNavNext.color = "#00e5ff";
    btnNavNext.thickness = 1.5;
    btnNavNext.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    btnNavNext.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    btnNavNext.left = "-480px";
    btnNavNext.isPointerBlocker = true;
    btnNavNext.hoverCursor = "pointer";
    const txtNavNext = new GUI.TextBlock();
    txtNavNext.text = "\u276F";
    txtNavNext.color = "#00e5ff";
    txtNavNext.fontSize = 28;
    btnNavNext.addControl(txtNavNext);
    showroomRoot.addControl(btnNavNext);
    const sideDossier = new GUI.Rectangle("sideDossier");
    sideDossier.width = "460px";
    sideDossier.height = "100%";
    sideDossier.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    sideDossier.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    sideDossier.background = "rgba(4, 9, 22, 0.96)";
    sideDossier.thickness = 1.5;
    sideDossier.color = "#00e5ff";
    sideDossier.isPointerBlocker = true;
    showroomRoot.addControl(sideDossier);
    const dossierContent = new GUI.StackPanel();
    dossierContent.width = "420px";
    dossierContent.top = "52px";
    dossierContent.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    sideDossier.addControl(dossierContent);
    const btnExitShowroom = new GUI.Rectangle("btnExitShowroom");
    btnExitShowroom.width = "420px";
    btnExitShowroom.height = "42px";
    btnExitShowroom.cornerRadius = 8;
    btnExitShowroom.background = "#059669";
    btnExitShowroom.color = "#34d399";
    btnExitShowroom.thickness = 1.5;
    btnExitShowroom.isPointerBlocker = true;
    btnExitShowroom.hoverCursor = "pointer";
    const txtExit = new GUI.TextBlock();
    txtExit.text = "\u2715 VOLVER AL TALLER (MESA DE ARMADO)";
    txtExit.color = "#ffffff";
    txtExit.fontSize = 12;
    txtExit.fontStyle = "bold";
    txtExit.isHitTestVisible = false;
    btnExitShowroom.addControl(txtExit);
    dossierContent.addControl(btnExitShowroom);
    const sep0 = new GUI.Rectangle();
    sep0.height = "10px";
    sep0.thickness = 0;
    dossierContent.addControl(sep0);
    const badgeCategory = new GUI.TextBlock();
    badgeCategory.text = "CATEGOR\xCDA: ALMACENAMIENTO DE ENERG\xCDA";
    badgeCategory.color = "#38bdf8";
    badgeCategory.fontSize = 10;
    badgeCategory.fontStyle = "bold";
    badgeCategory.height = "20px";
    badgeCategory.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    dossierContent.addControl(badgeCategory);
    const txtPartName = new GUI.TextBlock();
    txtPartName.text = "BATER\xCDA LIPO 3S 5000MAH (PILA PRINCIPAL)";
    txtPartName.color = "#ffffff";
    txtPartName.fontSize = 14;
    txtPartName.fontStyle = "bold";
    txtPartName.textWrapping = true;
    txtPartName.height = "42px";
    txtPartName.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    dossierContent.addControl(txtPartName);
    const txtMaterial = new GUI.TextBlock();
    txtMaterial.text = "\u{1F52C} Material: ...";
    txtMaterial.color = "#00e5ff";
    txtMaterial.fontSize = 11;
    txtMaterial.textWrapping = true;
    txtMaterial.height = "36px";
    txtMaterial.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    dossierContent.addControl(txtMaterial);
    const sep1 = new GUI.Rectangle();
    sep1.height = "1px";
    sep1.background = "rgba(0, 229, 255, 0.25)";
    sep1.thickness = 0;
    sep1.top = "4px";
    dossierContent.addControl(sep1);
    const lblSpecs = new GUI.TextBlock();
    lblSpecs.text = "\u2699\uFE0F ESPECIFICACIONES T\xC9CNICAS (VIDA REAL):";
    lblSpecs.color = "#e2e8f0";
    lblSpecs.fontSize = 11;
    lblSpecs.fontStyle = "bold";
    lblSpecs.height = "26px";
    lblSpecs.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    dossierContent.addControl(lblSpecs);
    const txtSpecsList = new GUI.TextBlock();
    txtSpecsList.text = "";
    txtSpecsList.color = "#94a3b8";
    txtSpecsList.fontSize = 11;
    txtSpecsList.textWrapping = true;
    txtSpecsList.height = "95px";
    txtSpecsList.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    dossierContent.addControl(txtSpecsList);
    const lblDesc = new GUI.TextBlock();
    lblDesc.text = "\u{1F4CB} FUNCI\xD3N EN EL PROTOTIPO:";
    lblDesc.color = "#e2e8f0";
    lblDesc.fontSize = 11;
    lblDesc.fontStyle = "bold";
    lblDesc.height = "22px";
    lblDesc.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    dossierContent.addControl(lblDesc);
    const txtDesc = new GUI.TextBlock();
    txtDesc.text = "";
    txtDesc.color = "#94a3b8";
    txtDesc.fontSize = 11;
    txtDesc.textWrapping = true;
    txtDesc.height = "40px";
    txtDesc.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    dossierContent.addControl(txtDesc);
    const errorCard = new GUI.Rectangle("errorCard");
    errorCard.width = "420px";
    errorCard.height = "115px";
    errorCard.cornerRadius = 8;
    errorCard.thickness = 1.5;
    errorCard.color = "#f59e0b";
    errorCard.background = "rgba(40, 22, 5, 0.85)";
    dossierContent.addControl(errorCard);
    const errorStack = new GUI.StackPanel();
    errorStack.width = "400px";
    errorStack.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    errorStack.top = "6px";
    errorCard.addControl(errorStack);
    const txtErrorTitle = new GUI.TextBlock();
    txtErrorTitle.text = "\u26A0\uFE0F DIAGN\xD3STICO: \xBFQU\xC9 PASA SI ESTA PIEZA FALLA O ES INCORRECTA?";
    txtErrorTitle.color = "#fbbf24";
    txtErrorTitle.fontSize = 10;
    txtErrorTitle.fontStyle = "bold";
    txtErrorTitle.height = "18px";
    txtErrorTitle.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    errorStack.addControl(txtErrorTitle);
    const txtErrorBody = new GUI.TextBlock();
    txtErrorBody.text = "";
    txtErrorBody.color = "#fed7aa";
    txtErrorBody.fontSize = 10;
    txtErrorBody.textWrapping = true;
    txtErrorBody.height = "85px";
    txtErrorBody.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    errorStack.addControl(txtErrorBody);
    const actionBox = new GUI.Rectangle();
    actionBox.height = "55px";
    actionBox.thickness = 0;
    dossierContent.addControl(actionBox);
    const badgeAssemblyState = new GUI.Rectangle();
    badgeAssemblyState.width = "180px";
    badgeAssemblyState.height = "34px";
    badgeAssemblyState.cornerRadius = 6;
    badgeAssemblyState.thickness = 1;
    badgeAssemblyState.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    const txtAssemblyState = new GUI.TextBlock();
    txtAssemblyState.fontSize = 10;
    txtAssemblyState.fontStyle = "bold";
    badgeAssemblyState.addControl(txtAssemblyState);
    actionBox.addControl(badgeAssemblyState);
    const btnTogglePartMount = new GUI.Rectangle();
    btnTogglePartMount.width = "210px";
    btnTogglePartMount.height = "34px";
    btnTogglePartMount.cornerRadius = 6;
    btnTogglePartMount.thickness = 1;
    btnTogglePartMount.color = "#ffffff";
    btnTogglePartMount.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    btnTogglePartMount.isPointerBlocker = true;
    btnTogglePartMount.hoverCursor = "pointer";
    const txtTogglePartMount = new GUI.TextBlock();
    txtTogglePartMount.fontSize = 10;
    txtTogglePartMount.fontStyle = "bold";
    txtTogglePartMount.color = "#ffffff";
    btnTogglePartMount.addControl(txtTogglePartMount);
    actionBox.addControl(btnTogglePartMount);
    const bottomCarousel = new GUI.Rectangle("bottomCarousel");
    bottomCarousel.width = "calc(100% - 500px)";
    bottomCarousel.height = "52px";
    bottomCarousel.cornerRadius = 8;
    bottomCarousel.thickness = 1;
    bottomCarousel.color = "rgba(0, 229, 255, 0.4)";
    bottomCarousel.background = "rgba(4, 9, 22, 0.94)";
    bottomCarousel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    bottomCarousel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    bottomCarousel.left = "20px";
    bottomCarousel.top = "-14px";
    bottomCarousel.isPointerBlocker = true;
    showroomRoot.addControl(bottomCarousel);
    const carouselGrid = new GUI.StackPanel();
    carouselGrid.isVertical = false;
    carouselGrid.height = "100%";
    bottomCarousel.addControl(carouselGrid);
    let carouselButtons = [];
    function buildCarouselButtons() {
      carouselGrid.clearControls();
      carouselButtons = [];
      PARTS.forEach((part, idx) => {
        const cBtn = new GUI.Rectangle("cBtn_" + part.id);
        cBtn.width = "90px";
        cBtn.height = "38px";
        cBtn.cornerRadius = 6;
        cBtn.thickness = 1;
        cBtn.color = "rgba(0, 229, 255, 0.3)";
        cBtn.background = "rgba(10, 20, 38, 0.9)";
        cBtn.left = "3px";
        cBtn.isPointerBlocker = true;
        cBtn.hoverCursor = "pointer";
        const cText = new GUI.TextBlock();
        const shortNames = [
          "\u{1F4D0} Chasis Inf",
          "\u{1F962} Brazos/ESC",
          "\u2699\uFE0F Motores",
          "\u{1F9E0} Pixhawk",
          "\u{1F9BE} Tren/Patas",
          "\u{1F50B} Pila LiPo",
          "\u{1F9EF} Tanque",
          "\u{1F300} H\xE9lices"
        ];
        cText.text = shortNames[idx] || part.shortTag;
        cText.fontSize = 10;
        cText.fontStyle = "bold";
        cText.color = "#e2e8f0";
        cBtn.addControl(cText);
        cBtn.onPointerClickObservable.add(() => {
          showPartInShowroom(part);
        });
        carouselGrid.addControl(cBtn);
        carouselButtons.push({ btn: cBtn, text: cText, part });
      });
    }
    __name(buildCarouselButtons, "buildCarouselButtons");
    function updateCarouselButtons(activeIdx) {
      carouselButtons.forEach((item, idx) => {
        if (idx === activeIdx) {
          item.btn.thickness = 2;
          item.btn.color = "#00e5ff";
          item.btn.background = "rgba(0, 160, 220, 0.45)";
          item.text.color = "#ffffff";
        } else {
          item.btn.thickness = 1;
          item.btn.color = item.part.isAssembled ? "rgba(52, 211, 153, 0.6)" : "rgba(148, 163, 184, 0.3)";
          item.btn.background = "rgba(10, 20, 38, 0.9)";
          item.text.color = item.part.isAssembled ? "#34d399" : "#94a3b8";
        }
      });
    }
    __name(updateCarouselButtons, "updateCarouselButtons");
    function updateShowroomMountButton(part) {
      if (part.isAssembled) {
        txtAssemblyState.text = "\u2713 MONTADA EN DRON";
        txtAssemblyState.color = "#34d399";
        badgeAssemblyState.color = "#34d399";
        badgeAssemblyState.background = "rgba(6, 78, 59, 0.6)";
        txtTogglePartMount.text = "\u2716 Desmontar a Banco";
        btnTogglePartMount.background = "#7f1d1d";
        btnTogglePartMount.color = "#f87171";
      } else {
        txtAssemblyState.text = "\u26AA EN BANCO DE TRABAJO";
        txtAssemblyState.color = "#94a3b8";
        badgeAssemblyState.color = "#64748b";
        badgeAssemblyState.background = "rgba(30, 41, 59, 0.6)";
        txtTogglePartMount.text = "\u{1F527} Montar en el Dron";
        btnTogglePartMount.background = "#059669";
        btnTogglePartMount.color = "#34d399";
      }
    }
    __name(updateShowroomMountButton, "updateShowroomMountButton");
    function showPartInShowroom(part) {
      currentInspectIndex = PARTS.indexOf(part);
      if (currentInspectIndex < 0) currentInspectIndex = 0;
      scene.clearColor = isLightBg ? new BABYLON.Color4(0.93, 0.95, 0.98, 1) : new BABYLON.Color4(0.12, 0.15, 0.2, 1);
      studioRim.intensity = 1.3;
      studioKey.intensity = 1.45;
      scene.transformNodes.forEach((tn) => {
        if (tn.setEnabled) tn.setEnabled(true);
      });
      droneRoot.setEnabled(true);
      const targetMeshes = new Set(part.group.getChildMeshes());
      scene.meshes.forEach((m) => {
        if (m.name.startsWith("tag_") || m.name.startsWith("labelAnchor")) return;
        if (m === showroomPedestal) {
          m.setEnabled(true);
          m.isVisible = true;
          return;
        }
        const isTarget = targetMeshes.has(m);
        m.setEnabled(isTarget);
        m.isVisible = isTarget;
      });
      PARTS.forEach((p, idx) => {
        if (idx === currentInspectIndex) {
          p.group.setEnabled(true);
          p.group.position.set(0, 0, 0);
          p.group.rotation.set(0, 0, 0);
        } else {
          p.group.setEnabled(false);
        }
      });
      const targetPos = new BABYLON.Vector3(-0.06, 0.16, 0.02);
      const targetRadius = part.id === 1 || part.id === 2 || part.id === 5 || part.id === 8 ? 0.65 : 0.42;
      scene.cameras.forEach((cam) => {
        if (cam instanceof BABYLON.ArcRotateCamera) {
          cam.setTarget(targetPos);
          cam.alpha = -Math.PI / 2;
          cam.beta = 1.15;
          cam.radius = targetRadius;
        }
      });
      camera.setTarget(targetPos);
      camera.alpha = -Math.PI / 2;
      camera.beta = 1.15;
      camera.radius = targetRadius;
      scene.activeCamera = camera;
      scene.activeCameras = [camera];
      txtBreadcrumb.text = `PROTOTIPO: ${activePrototypeId.toUpperCase()} > PIEZA ${currentInspectIndex + 1} DE ${PARTS.length}: ${part.shortTag}`;
      badgeCategory.text = `CATEGOR\xCDA: ${part.category || "COMPONENTE PRINCIPAL"}`;
      txtPartName.text = part.name;
      txtMaterial.text = `\u{1F52C} Material: ${part.material}`;
      let specStr = "";
      for (const [k, v] of Object.entries(part.specs || {})) {
        specStr += `\u2022 ${k.toUpperCase()}: ${v}
`;
      }
      txtSpecsList.text = specStr;
      txtDesc.text = part.desc;
      txtErrorBody.text = part.errorReal || "Revisar compatibilidad y tolerancias mec\xE1nicas.";
      updateShowroomMountButton(part);
      updateCarouselButtons(currentInspectIndex);
    }
    __name(showPartInShowroom, "showPartInShowroom");
    function closePartShowroom() {
      try {
        isIsolatedInspection = false;
        showroomRoot.isVisible = false;
        scene.clearColor = new BABYLON.Color4(0.1, 0.12, 0.16, 1);
        studioRim.intensity = 0.65;
        studioKey.intensity = 1.1;
        showroomPedestal.setEnabled(false);
        showroomPedestal.isVisible = false;
        scene.transformNodes.forEach((tn) => {
          if (tn && tn.setEnabled) tn.setEnabled(true);
        });
        scene.meshes.forEach((m) => {
          if (m === showroomPedestal) {
            m.setEnabled(false);
            m.isVisible = false;
            return;
          }
          m.setEnabled(true);
          m.isVisible = true;
        });
        PARTS.forEach((p) => {
          if (p && p.group) {
            p.group.setEnabled(true);
            p.group.position.copyFrom(p.isAssembled ? p.assembledPos : p.benchPos);
            p.group.rotation.set(0, 0, 0);
          }
        });
        const returnTarget = new BABYLON.Vector3(0, 0.18, 0);
        const returnRadius = lastWorkshopCamRadius && lastWorkshopCamRadius > 0.8 ? lastWorkshopCamRadius : 1.35;
        const returnAlpha = lastWorkshopCamAlpha || -Math.PI / 2;
        const returnBeta = lastWorkshopCamBeta || Math.PI / 2.7;
        scene.cameras.forEach((cam) => {
          if (cam instanceof BABYLON.ArcRotateCamera) {
            cam.setTarget(returnTarget);
            cam.alpha = returnAlpha;
            cam.beta = returnBeta;
            cam.radius = returnRadius;
          }
        });
        camera.setTarget(returnTarget);
        camera.alpha = returnAlpha;
        camera.beta = returnBeta;
        camera.radius = returnRadius;
        scene.activeCamera = camera;
        scene.activeCameras = [camera];
        hudCard.isVisible = true;
        bottomBar.isVisible = true;
        updateLabelsVisibility();
        updateHUD();
      } catch (err) {
        console.error("Error al salir de showroom:", err);
      }
    }
    __name(closePartShowroom, "closePartShowroom");
    btnNavPrev.onPointerClickObservable.add(() => {
      currentInspectIndex = (currentInspectIndex - 1 + PARTS.length) % PARTS.length;
      showPartInShowroom(PARTS[currentInspectIndex]);
    });
    btnNavPrev.onPointerUpObservable.add(() => {
      currentInspectIndex = (currentInspectIndex - 1 + PARTS.length) % PARTS.length;
      showPartInShowroom(PARTS[currentInspectIndex]);
    });
    btnNavNext.onPointerClickObservable.add(() => {
      currentInspectIndex = (currentInspectIndex + 1) % PARTS.length;
      showPartInShowroom(PARTS[currentInspectIndex]);
    });
    btnNavNext.onPointerUpObservable.add(() => {
      currentInspectIndex = (currentInspectIndex + 1) % PARTS.length;
      showPartInShowroom(PARTS[currentInspectIndex]);
    });
    btnBackToWorkshop.onPointerClickObservable.add(() => closePartShowroom());
    btnBackToWorkshop.onPointerUpObservable.add(() => closePartShowroom());
    btnExitShowroom.onPointerClickObservable.add(() => closePartShowroom());
    btnExitShowroom.onPointerUpObservable.add(() => closePartShowroom());
    scene.onKeyboardObservable.add((kbInfo) => {
      if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN && (kbInfo.event.key === "Escape" || kbInfo.event.key === "Esc" || kbInfo.event.key === "Backspace")) {
        if (isIsolatedInspection) {
          closePartShowroom();
        }
      }
    });
    btnTogglePartMount.onPointerClickObservable.add(() => {
      const currentPart = PARTS[currentInspectIndex];
      if (!currentPart) return;
      currentPart.isAssembled = !currentPart.isAssembled;
      updateShowroomMountButton(currentPart);
      updateCarouselButtons(currentInspectIndex);
      updateHUD();
    });
    scene.onBeforeRenderObservable.add(() => {
      if (isIsolatedInspection && PARTS[currentInspectIndex] && PARTS[currentInspectIndex].group) {
        PARTS[currentInspectIndex].group.rotation.y += 6e-3;
      }
    });
    function openPartInspectionScreen(part) {
      isIsolatedInspection = true;
      lastWorkshopCamTarget = camera.target.clone();
      lastWorkshopCamRadius = camera.radius;
      lastWorkshopCamAlpha = camera.alpha;
      lastWorkshopCamBeta = camera.beta;
      workbenchRoot.getChildMeshes().forEach((m) => {
        m.setEnabled(false);
        m.isVisible = false;
      });
      hudCard.isVisible = false;
      bottomBar.isVisible = false;
      labelControls.forEach((l) => l.rect.isVisible = false);
      showroomRoot.isVisible = true;
      buildCarouselButtons();
      showPartInShowroom(part);
    }
    __name(openPartInspectionScreen, "openPartInspectionScreen");
    const openIsolatedInspection = openPartInspectionScreen;
    const diagnosticModal = new GUI.Rectangle("diagnosticModal");
    diagnosticModal.width = "480px";
    diagnosticModal.height = "320px";
    diagnosticModal.cornerRadius = 10;
    diagnosticModal.thickness = 2;
    diagnosticModal.color = "#00e5ff";
    diagnosticModal.background = "rgba(4, 10, 24, 0.96)";
    diagnosticModal.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    diagnosticModal.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    diagnosticModal.isVisible = false;
    ui.addControl(diagnosticModal);
    const diagTitle = new GUI.TextBlock();
    diagTitle.text = "DIAGN\xD3STICO AERON\xC1UTICO Y TEST DE VUELO";
    diagTitle.color = "#00e5ff";
    diagTitle.fontSize = 12;
    diagTitle.fontStyle = "bold";
    diagTitle.top = "-125px";
    diagnosticModal.addControl(diagTitle);
    const diagResult = new GUI.TextBlock();
    diagResult.text = "";
    diagResult.color = "#ffffff";
    diagResult.fontSize = 11;
    diagResult.textWrapping = true;
    diagResult.width = "430px";
    diagResult.top = "-5px";
    diagnosticModal.addControl(diagResult);
    const btnCloseDiag = new GUI.Rectangle();
    btnCloseDiag.width = "180px";
    btnCloseDiag.height = "34px";
    btnCloseDiag.cornerRadius = 6;
    btnCloseDiag.background = "#162846";
    btnCloseDiag.color = "white";
    btnCloseDiag.top = "120px";
    btnCloseDiag.isPointerBlocker = true;
    const bdText = new GUI.TextBlock();
    bdText.text = "Cerrar Diagn\xF3stico";
    bdText.color = "white";
    bdText.fontSize = 11;
    btnCloseDiag.addControl(bdText);
    diagnosticModal.addControl(btnCloseDiag);
    btnCloseDiag.onPointerClickObservable.add(() => {
      diagnosticModal.isVisible = false;
    });
    function runFlightDiagnostic() {
      diagnosticModal.isVisible = true;
      const assembledCount = PARTS.filter((p) => p.isAssembled).length;
      if (assembledCount < 8) {
        diagTitle.text = "\u274C FALLO CR\xCDTICO: PROTOTIPO INCOMPLETO";
        diagTitle.color = "#ff334b";
        diagnosticModal.color = "#ff334b";
        const faltantes = PARTS.filter((p) => !p.isAssembled).map((p) => p.shortTag).join(", ");
        diagResult.text = `El dron no puede encender ni probarse en banco porque faltan piezas cr\xEDticas:

\u2022 Piezas sin montar: ${faltantes}

\u26A0\uFE0F Consecuencia en la vida real: Si intentas arrancar sin todas las conexiones montadas, el controlador Pixhawk entrar\xE1 en error de 'PreArm Check' por circuito abierto o falta de alimentaci\xF3n.`;
        return;
      }
      const isHexa = activePrototypeId === "tarot680";
      const numMotores = isHexa ? 6 : 4;
      const pesoDron = isHexa ? 3.85 : 2.55;
      const empujeMax = numMotores * 1.25;
      const twr = empujeMax / pesoDron;
      const corrienteHover = isHexa ? 28 : 22;
      const autonomiaMin = Math.round(5 / corrienteHover * 60 * 0.82);
      if (twr < 1.4) {
        diagTitle.text = "\u26A0\uFE0F ADVERTENCIA: RELACI\xD3N EMPUJE/PESO DEFICIENTE";
        diagTitle.color = "#ff9900";
        diagnosticModal.color = "#ff9900";
        diagResult.text = `\u2022 Peso Total (TOW): ${pesoDron.toFixed(2)} kg | Empuje M\xE1ximo: ${empujeMax.toFixed(2)} kg
\u2022 Ratio Thrust-to-Weight: ${twr.toFixed(2)}:1 (M\xEDnimo recomendado: 1.80:1)

\u274C Consecuencia: El dron es demasiado pesado para sus motores/h\xE9lices. Se sobrecalentar\xE1n los ESC y perder\xE1 altura al acelerar contra r\xE1fagas de viento.`;
      } else {
        diagTitle.text = "\u2705 CERTIFICACI\xD3N DE VUELO: APROBADO (REALISMO 100%)";
        diagTitle.color = "#00e5ff";
        diagnosticModal.color = "#00e5ff";
        diagResult.text = `\u2713 Par\xE1metros Din\xE1micos de Ingenier\xEDa Real:
\u2022 Peso Total con Retardante: ${pesoDron.toFixed(2)} kg
\u2022 Empuje M\xE1ximo (${numMotores} Motores 5010): ${empujeMax.toFixed(2)} kg
\u2022 Relaci\xF3n Empuje/Peso (TWR): ${twr.toFixed(2)}:1 (Excelente margen de maniobra)
\u2022 Consumo en Vuelo Estacionario (Hover): ${corrienteHover}A @ 11.1V
\u2022 Autonom\xEDa Estimada con LiPo 3S 5000mAh: ${autonomiaMin} Minutos
\u2022 Margen de Seguridad de Variadores (ESCs 40A): 35% de holgura t\xE9rmica.

\u{1F3C6} \xA1Este prototipo es aerodin\xE1micamente viable para construcci\xF3n f\xEDsica en laboratorio!`;
      }
    }
    __name(runFlightDiagnostic, "runFlightDiagnostic");
    const hudCard = new GUI.Rectangle("hudCard");
    hudCard.width = "540px";
    hudCard.height = "105px";
    hudCard.cornerRadius = 10;
    hudCard.thickness = 1.5;
    hudCard.color = "#00e5ff";
    hudCard.background = "rgba(4, 10, 24, 0.95)";
    hudCard.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    hudCard.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    hudCard.top = "12px";
    ui.addControl(hudCard);
    const hudTitle = new GUI.TextBlock();
    hudTitle.text = "SIMULADOR DE INGENIER\xCDA \u2022 ZD550 FORESTAL";
    hudTitle.color = "#00e5ff";
    hudTitle.fontSize = 11;
    hudTitle.fontStyle = "bold";
    hudTitle.top = "-36px";
    hudCard.addControl(hudTitle);
    const hudPieceName = new GUI.TextBlock();
    hudPieceName.text = "\u{1F449} Toca cualquier pieza o letrero para ver especificaciones y montarla";
    hudPieceName.color = "#ffffff";
    hudPieceName.fontSize = 13;
    hudPieceName.fontStyle = "bold";
    hudPieceName.top = "-12px";
    hudCard.addControl(hudPieceName);
    const hudPieceDesc = new GUI.TextBlock();
    hudPieceDesc.text = "Materiales PBR de alta fidelidad, c\xE1lculo de empuje y detecci\xF3n de errores de vuelo.";
    hudPieceDesc.color = "#94a3b8";
    hudPieceDesc.fontSize = 10;
    hudPieceDesc.textWrapping = true;
    hudPieceDesc.width = "510px";
    hudPieceDesc.top = "16px";
    hudCard.addControl(hudPieceDesc);
    function showInspectionCard(part) {
      hudTitle.text = "PIEZA SELECCIONADA: " + part.shortTag;
      hudPieceName.text = part.name;
      hudPieceDesc.text = "\u{1F52C} Material: " + part.material + " | \u2699\uFE0F Funci\xF3n: " + part.desc;
    }
    __name(showInspectionCard, "showInspectionCard");
    const bottomBar = new GUI.Rectangle("bottomBar");
    bottomBar.width = "640px";
    bottomBar.height = "64px";
    bottomBar.cornerRadius = 10;
    bottomBar.thickness = 1;
    bottomBar.color = "rgba(0, 229, 255, 0.4)";
    bottomBar.background = "rgba(4, 10, 24, 0.94)";
    bottomBar.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    bottomBar.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    bottomBar.top = "-14px";
    ui.addControl(bottomBar);
    function makeBtn(txt, bg, leftPx, w = "125px") {
      const btn = new GUI.Rectangle();
      btn.width = w;
      btn.height = "34px";
      btn.cornerRadius = 6;
      btn.thickness = 1;
      btn.color = "rgba(255,255,255,0.25)";
      btn.background = bg;
      btn.left = leftPx;
      btn.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
      btn.isPointerBlocker = true;
      const t = new GUI.TextBlock();
      t.text = txt;
      t.color = "white";
      t.fontSize = 10;
      t.fontStyle = "bold";
      btn.addControl(t);
      bottomBar.addControl(btn);
      return btn;
    }
    __name(makeBtn, "makeBtn");
    const btnNextAuto = makeBtn("Armar Siguiente \u25B6", "#0c4426", "-240px", "125px");
    const btnDiag = makeBtn("\u{1F9EA} Test de Vuelo", "#78350f", "-110px", "120px");
    const btnIsolate = makeBtn("\u{1F50D} Estudio de Pieza", "#1e3a8a", "20px", "125px");
    const btnChangeProto = makeBtn("\u{1F504} Cambiar Prototipo", "#312e81", "150px", "125px");
    const btnReset = makeBtn("\u21A9 Vaciar Mesa", "#4a1215", "265px", "95px");
    btnNextAuto.onPointerClickObservable.add(() => {
      const nextPart = PARTS.find((p) => !p.isAssembled);
      if (nextPart) {
        animateHandAssemble(nextPart, updateHUD);
      }
    });
    btnDiag.onPointerClickObservable.add(runFlightDiagnostic);
    btnIsolate.onPointerClickObservable.add(() => {
      const target = PARTS.find((p) => !p.isAssembled) || PARTS[0];
      openPartInspectionScreen(target);
    });
    btnChangeProto.onPointerClickObservable.add(() => {
      if (activePrototypeId === "zd550") {
        activePrototypeId = "tarot680";
        hudTitle.text = "PROTOTIPO ACTIVO: TAROT 680 PRO HEXA (6 MOTORES)";
      } else {
        activePrototypeId = "zd550";
        hudTitle.text = "PROTOTIPO ACTIVO: ZD550 QUAD FORESTAL (4 MOTORES)";
      }
      buildDroneComponents(activePrototypeId);
    });
    btnReset.onPointerClickObservable.add(resetWorkbench);
    function updateHUD() {
      const assembledCount = PARTS.filter((p) => p.isAssembled).length;
      const pct = Math.round(assembledCount / PARTS.length * 100);
      if (assembledCount === 0) {
        hudTitle.text = `TALLER EN BANCO \u2022 ${activePrototypeId.toUpperCase()} (0%)`;
        hudPieceName.text = "\u{1F449} Toca cualquier pieza o letrero para abrir su apartado t\xE9cnico 3D dedicado.";
        hudPieceDesc.text = "Giro 360\xB0, especificaciones reales, compatibilidad y detecci\xF3n de fallos por pieza.";
      } else if (assembledCount < PARTS.length) {
        const nextPart = PARTS.find((p) => !p.isAssembled);
        hudTitle.text = `ENSAMBLAJE: ${assembledCount} / ${PARTS.length} PIEZAS MONTADAS (${pct}%)`;
        hudPieceName.text = "\u{1F449} Toca una pieza para examinarla en 3D o presiona 'Armar Siguiente \u25B6'.";
        hudPieceDesc.text = "Siguiente pieza recomendada: " + nextPart.shortTag;
      } else {
        hudTitle.text = `\xA1${activePrototypeId.toUpperCase()} 100% ENSAMBLADO!`;
        hudPieceName.text = "\u2713 Prototipo completo. Haz clic en '\u{1F9EA} Test de Vuelo' para diagnosticar.";
        hudPieceDesc.text = "El motor f\xEDsico calcular\xE1 peso, empuje, TWR y viabilidad para la vida real.";
      }
    }
    __name(updateHUD, "updateHUD");
    scene.onPointerDown = function(evt, pick) {
      if (isIsolatedInspection) return;
      if (evt.button === 0 && pick.hit && pick.pickedMesh) {
        const m = pick.pickedMesh;
        for (let i = 0; i < PARTS.length; i++) {
          const part = PARTS[i];
          if (part.group === m || part.group.getChildren().includes(m) || m.isDescendantOf(part.group)) {
            openPartInspectionScreen(part);
            break;
          }
        }
      }
    };
    scene.onPointerMove = function(evt, pick) {
      if (isIsolatedInspection) return;
      if (pick.hit && pick.pickedMesh) {
        const m = pick.pickedMesh;
        for (let i = 0; i < PARTS.length; i++) {
          const part = PARTS[i];
          if (part.group === m || part.group.getChildren().includes(m) || m.isDescendantOf(part.group)) {
            showInspectionCard(part);
            break;
          }
        }
      }
    };
    buildDroneComponents("zd550");
  }
};

// ../../../../OneDrive/Documentos/Midron/src/scripts.ts
var scriptsMap = {
  "scripts/Dron.ts": Dron_exports
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _applyScriptsForObject,
  _preloadScriptsAssets,
  _removeRegisteredScriptInstance,
  getDefaultRenderingPipeline,
  getMotionBlurPostProcess,
  getSSAO2RenderingPipeline,
  getSSRRenderingPipeline,
  getTAARenderingPipeline,
  getVLSPostProcess,
  getVolumetricLightingRenderingPipeline,
  loadScene,
  scriptAssetsCache,
  scriptsDictionary,
  scriptsMap
});
//# sourceMappingURL=script.cjs.map
