---
title: ALGAE-watch
heading: "ALGAE-watch: Monitoring Algae Blooms from Space"
tagline: Combining radar and optical satellite imagery to track harmful algal blooms in Lough Neagh, whatever the weather.
description: Blue Algae Surveillance
img: assets/img/ALGAE/predictions.png
featured_result: "0.359 mIoU with radar, optical imagery and super-resolution training."
importance: 2
category: PostDoc
related_publications: true
tags: [Remote sensing, Multimodal fusion, SAR]
# TODO(human): Describe your contribution, dates and current status.
# Empty fields stay hidden. My role also appears on featured cards.
my_role: ""
project_dates: ""
project_status: ""
---

Lough Neagh in Northern Ireland is the UK's largest freshwater lake, covering 383 km² and supplying much of the region's drinking water. In recent years it has suffered severe, long-lasting harmful algal blooms, driven by eutrophication, climate change and invasive zebra mussels. The blooms damage fisheries and wildlife, affect recreation and make drinking water harder to treat.

Monitoring a lake this size is hard. Taking water samples from boats is slow and expensive, covers only a few points, and dense blooms can stop boats reaching sampling sites at all. Optical satellites can see the whole lake, but Northern Ireland is cloudy for much of the year.

**ALGAE-watch** (Blue Algae Surveillance: a remote sensing-based digital twin framework) tackles this by combining two very different satellites. Sentinel-2 gives detailed optical images when the sky is clear. Sentinel-1's Synthetic Aperture Radar (SAR) sees through cloud, day and night. The work is published at the ICIP 2026 Workshops {% cite nazarimehrabani2026algae %}.

## Seeing algae with radar

Radar works by measuring how much energy bounces back from a surface. Calm, clean water acts like a mirror and reflects the signal away from the satellite, so it looks dark. Floating algae mats roughen the surface and send more signal back.

Comparing a bloom-free month (February 2025) with a bloom month (September 2025), the VV polarisation backscatter rose by **6.4 dB**, while VH barely changed. That makes VV a reliable proxy for algal biomass.

Wind is the catch: it roughens the water too. Two images taken just one day apart in June 2025 showed very different backscatter because of a change in wind speed. To separate algae from wind, we used ERA5 wind data to pick the calmest radar image available for each month from 2023 to 2025.

<div class="row">
    <div>
        {% include figure.liquid path="assets/img/ALGAE/vv_timeseries.png" title="Monthly VV backscatter" alt="Grid of monthly maps of Lough Neagh coloured by radar backscatter, 2023 to 2025" %}
    </div>
</div>
<div class="caption">
Monthly VV backscatter over Lough Neagh, 2023–2025. Winter months are low and uniform, while spring to autumn are elevated and patchy as algae grow.
</div>

The result is a clear seasonal cycle: low, even backscatter from November to March, and higher, patchy backscatter from April to October, matching the algae growing season.

## Fusing radar and optical data

Radar alone is noisy, while optical images are rich in detail but often blocked by cloud. To get the best of both, we built a multimodal deep learning model with three parallel streams:

- **Optical:** Sentinel-2 RGB tiles encoded with DeepLabV3 (ResNet-50), then pooled into superpixel regions.
- **SAR:** Sentinel-1 radar tiles passed through a dedicated convolutional encoder.
- **SAR statistics:** Gaussian fits to the backscatter distribution of each tile, capturing its overall character.

A gated cross-attention module fuses the three streams. The model then classifies each region as background or as low-, medium- or high-density bloom, and the predictions are stitched back into a map of the whole lake.

<div class="row">
    <div>
        {% include figure.liquid path="assets/img/ALGAE/architecture.png" title="Fusion architecture" alt="Diagram of the three-stream multimodal fusion architecture" %}
    </div>
</div>
<div class="caption">
The multimodal fusion architecture.
</div>

## Results

The model was trained on 5,475 samples and tested on 1,449. Each extra data source helped: adding radar improved low- and medium-density regions, and adding radar statistics improved medium-density detection further. The full model combining all three performed best, with an mIoU of 0.348 and a macro-F1 of 0.470. Adding super-resolution Sentinel-2 imagery during training made the low- and medium-density classes easier to tell apart, raising mIoU to 0.359.

Compared with representative methods from other algal bloom studies, adapted to the same data, the approach gives gains of up to **126% in mIoU** and **40% in macro-F1**.

<div class="row">
    <div>
        {% include figure.liquid path="assets/img/ALGAE/predictions.png" title="Bloom predictions" alt="Study area, input images, ground truth and model predictions for Lough Neagh" %}
    </div>
</div>
<div class="caption">
Top: the study area, a radar image, an optical image and the ground truth. Bottom: predictions from each model variant, from RGB only to the full model with super-resolution. Blue, green and yellow show low, medium and high bloom density.
</div>

## Why it matters

Combining radar and optical satellites gives a way to monitor algal blooms across the whole of Lough Neagh, all year round, without sending boats out or waiting for clear skies. It's a step towards a digital twin of the lake and early warnings for water managers.

*ALGAE-watch is funded by the Department of Agriculture, Environment and Rural Affairs (DAERA) and the UK Space Agency through a Small Business Research Initiative (SBRI) in Northern Ireland.*
