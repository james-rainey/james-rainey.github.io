---
layout: page
title: Gait Recognition
description: Using 3D Markerless Motion Capture
main_title: <h1 align=center>Gait Recognition</h1><hr>
main_description: <h2 align=center>Recognising People by How they Walk, Not How They Look </h2>

img: assets/img/GaitRecognition/joints.png
importance: 3
category: work
related_publications: true
---

<style>
h2   {
     color: #429435;
     font-size:180%;
     }
</style>

---


Most biometric systems rely on faces, fingerprints, or iris scans. Even existing gait recognition techniques depend on body shape or silhouette-based features, which can easily be thrown off by clothing, lighting, or camera angle.

I wanted to build something different: a system that looks only at **movement**, not appearance. A way to identify people through their motion, using their walk as a digital signature.

*Based on my paper “Gait Recognition from Markerless 3D Motion Capture” {% cite rainey2019gait %}*

<br>

## 🎯 Goal
---

The main goal of this project was to create a **movement-only gait recognition system** that uses standard camera footage without relying on depth sensors or marker based cpature for gait recognition.

The approach focuses purely on **body motion**, not shape or looks, which is derived from a standard statisitical body model, with the aim being to work reliably across people and walking conditions.  

The ultimate ambition was to develop a system that performs **competitively** with methods using advanced motion capture systems, without requiring expensive capture equipment.  

<br>
## ⚙️ How It Works
---
Here’s the full pipeline:

1. **2D Pose Detection**  
   I used **DeeperCut**, a convolutional neural network (CNN), to find key joints (hips, knees, ankles, etc.) in each video frame.  

2. **3D Model Fitting**  
   Using **SMPL** (Skinned Multi-Person Linear model) and **SMPLify**, I fit a realistic 3D human body model to those 2D joints, turning regular video into accurate 3D motion data.  

3. **Gait Cycle Extraction**  
   I identified complete walking cycles (roughly 25 frames per cycle) based on stride length and silhouette changes.  

4. **Feature Representation**  
   Each gait cycle becomes a **motion signature**: a flattened vector of joint rotations describing the unique way someone walks.  

5. **Automated Classification**  
   I used **Auto-sklearn**, an AutoML framework, to automatically test, tune, and combine the best machine learning models for classifying these gait signatures.  

<br>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GaitRecognition/deepercut_joints_cropped.png" title="Joint Extraction" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GaitRecognition/joints.png" title="Joint Model Fitting" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GaitRecognition/SMPLify_example_090_cropped.png" title="Image to 3D model" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
Joints extracted from an image (left), joints fitted to a synthetic body model (centre) and a model extracted from an image (right).  
</div>

<br>

## 💡 Tech Stack
---

A variety of tools were required to make this possible:

<div align=center markdown=1>

| Area | Tools |
|------|-------|
| Pose Estimation | DeeperCut (CNN) |
| 3D Modeling | SMPL & SMPLify |
| Machine Learning | Auto-sklearn |
| Dataset | CASIA-B Gait Dataset (124 subjects, 90° view) |
| Languages | Python, NumPy, scikit-learn |
| Output | ROC, AUC, and rank-based identification metrics |

</div>
<br>

## 🧩 Challenges & Solutions
---

A number of challenges were faced throughout the project, but nothing proved unsolvable.
<br>

|Challenge | My Approach |
|----------|--------------|
| **Slow fitting with SMPLify** | Optimised frame sampling and processed only gait cycles, not every frame. |
| **Cycle detection** | Used stride length and silhouette changes to detect full gait loops automatically. |
| **Algorithm selection** | Let Auto-sklearn handle model and hyperparameter search with Bayesian optimisation. |
| **Explaining the final results** | Compared against methods using Kinect and marker-based skeleton data to contextualise performance. |

<br>

## 📊 Results
---

Even though the model only used 2D video, it performed on par with systems using 3D Kinect depth data or traditional motion capture setups to extract skeleton information, a big win for accessibility and scalability.
<br>

<div align=center markdown=1>

| Metric | Score |
|--------|-------|
| Equal Error Rate (EER) | **18.4%** |
| Area Under ROC Curve (AUC) | **0.90** |
| Mean Average Precision (MAP) | **0.90** |
| Rank-1 Identification Accuracy | **46.7%** |

</div>

<br>

## 🔍 Why This Matters
---
- **Non-intrusive:** Works without the subject’s cooperation.  
- **Hardware-free:** Uses standard cameras, no special equipment.  
- **Clothing-robust:** Motion isn’t affected by what the person wears.  
- **Scalable:** Could be applied to surveillance, healthcare, sports, and animation.  

This shows that *how* we move is just as distinctive as *how* we look, and can be used for recognition, analysis, and even creative applications.

<br>
## 🔑  Key Takeaways
---
- **Movement is identity.** Gait holds subtle, person-specific features.  
- **AutoML saves time.** Auto-sklearn can rival manual model tuning.  
- **3D from 2D is possible.** Markerless motion capture is surprisingly accurate.  
- **Real-world ready.** Works with simple, everyday video footage.  

<br>
## 🚀 What’s Next

---
Future directions for this research include:
- Combining **shape** and **motion** cues for higher accuracy  
- Using **real-time SMPL** models for live gait analysis  
- Testing under realistic conditions (different clothes, bags, crowds)  
- Adding **automatic gender estimation** for better model fitting  

<br>

## 💭 Reflection
---
This project was a fascinating intersection of biomechanics, computer vision, and machine learning. It taught me how deeply *motion* defines identity, and how technology can uncover those patterns invisibly.

It also reminded me that innovation doesn’t always need more data or sensors, sometimes it just takes a smarter way to look at what we already have.

<br>


