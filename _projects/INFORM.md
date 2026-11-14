---
title: INFORM
heading: "INFORM: Intelligent Food Recognition and Monitoring"
tagline: An edge AI system that tracks what patients eat and what goes to waste, plate by plate.
description: Intelligent Food Recognition and Monitoring
img: assets/img/INFORM/food_before.jpg
featured_result: "Food detection in 0.65 seconds on a Raspberry Pi 5."
importance: 1
category: PostDoc
related_publications: true
tags: [Edge AI, Food recognition, Patent]
# TODO(human): Describe your contribution, dates and current status.
# Empty fields stay hidden. My role also appears on featured cards.
my_role: ""
project_dates: ""
project_status: ""
---

In hospitals and care homes, what patients eat is still usually recorded with pen and paper. That makes it slow, error-prone and almost impossible to do at scale, even though food is central to recovery. Over 160,000 people over 75 in UK care homes are estimated to be malnourished, and malnourished patients cost up to four times more to treat. At the same time, up to 18% of food in NHS hospitals is wasted, the equivalent of one in every six meals.

**INtelligent FOod Recognition and Monitoring (INFORM)** (UK Patent GB2616522) is the first end-to-end edge AI system for analysing food consumption and plate waste in hospitals. It identifies every food item on a plate, estimates its weight, temperature and nutritional content, and sends the results to a dashboard, all on a Raspberry Pi.

INFORM was developed through a Knowledge Transfer Partnership between Falcon Foodservice Equipment and Newcastle University, supported by Innovate UK. The work is described in two papers: an early embedded prototype {% cite rainey2024food %} and the full engineered system {% cite rainey2026inform %}.

<div class="row">
    <div>
        {% include figure.liquid path="assets/img/INFORM/INFORMPrototypes.png" title="INFORM prototypes" alt="Three INFORM prototype units" %}
    </div>
</div>
<div class="caption">
The INFORM prototypes: v1, v2 and v3.
</div>

## How it works

Each plate carries a cheap, waterproof NFC tag. When a plate is placed under INFORM, the system reads the tag, captures images and runs a four-stage pipeline:

1. **Food detection:** a lightweight YOLOv8 model finds each food item and draws a bounding box around it.
2. **Food segmentation:** EdgeSAM, a version of the Segment Anything Model optimised for edge devices, turns each box into a precise mask. It is zero-shot, so it needs no hand-labelled segmentation data.
3. **Weight estimation:** a stereo camera pair gives a depth map via semi-global matching. Combined with the masks, this gives each food's volume, which a per-food calibration converts to weight.
4. **Temperature estimation:** a thermal camera reads the temperature of each masked item, corrected for the difference between surface and core temperature.

<div class="row">
    <div>
        {% include figure.liquid path="assets/img/INFORM/pipeline.png" title="INFORM pipeline" alt="Flow diagram: plate images feed detection, segmentation, weight and temperature estimation, then the dashboard" %}
    </div>
    <div class="figure-narrow">
        {% include figure.liquid path="assets/img/INFORM/hardware.png" title="INFORM hardware" alt="Exploded view of the INFORM hardware" %}
    </div>
</div>
<div class="caption">
Left: the INFORM pipeline. Right: the hardware. The camera head (1–5) holds two optical cameras, a thermal camera, an LED array and a diffusion panel; the base (6–8) holds the NFC reader and a Raspberry Pi.
</div>

When the plate comes back after the meal, the same scan runs again. Comparing the two scans gives how much of each food was eaten and how much was wasted. Combined with the nutritional content of each dish, that gives each patient's actual intake.

<div class="row">
    <div>
        {% include figure.liquid path="assets/img/INFORM/segmentation.png" title="Segmentation examples" alt="Full and partially eaten plates with coloured segmentation masks" %}
    </div>
</div>
<div class="caption">
Segmentation masks (right) for a full plate (top) and the same plate partly eaten (bottom).
</div>

## Actionable results

All the measurements go to an online dashboard where the right people can act on them. Dietitians can see what each patient actually ate and adjust meal plans. Kitchen managers can see which dishes come back uneaten, refine menus and portion sizes, and track waste over time. This directly supports NHS England's national standard requiring organisations to monitor and reduce plate waste.

<div class="row">
    <div>
        {% include figure.liquid path="assets/img/INFORM/INFORMFlow.png" title="INFORM in a hospital workflow" alt="Diagram of INFORM within the hospital food journey" %}
    </div>
</div>
<div class="caption">
Where INFORM fits into a hospital's food journey.
</div>

## Results

INFORM was trained on FoodSeg103 and the INFORM dataset: 862 images of meals regularly served in NHS hospitals, with 3,040 labelled food items across 20 classes. It was then tested in more than 700 live tests in a working kitchen at Newcastle University, with freshly cooked food served by several different people.

The results below separate dataset evaluation from live kitchen testing. See Sections 4.3–4.6 of the [accepted paper](https://eprints.ncl.ac.uk/309442) for the evaluation details.

| Measure | Evaluation setting | Result |
| --- | --- | --- |
| Detection accuracy | INFORM test set | 87.4% |
| Detection accuracy | 702 live kitchen tests | 84.9% |
| Segmentation mIoU | INFORM dataset | 0.760 |
| Segmentation mIoU | FoodSeg103 dataset | 0.412 |
| Mean weight accuracy | Live tests, freshly served plates | 91.4% |
| Mean weight accuracy | Live tests, partly eaten plates | 79.0% |
| Mean temperature accuracy | Live tests, compared with probe measurements | 96.2% |

mIoU measures the overlap between predicted and reference segmentation masks, averaged across classes. Values here use the 0–1 scale, where 1 means perfect overlap. The paper reports the same scores on a 0–100 scale.

Weight accuracy is the paper's average percentage accuracy of estimated food weights against measured weights. Temperature accuracy compares the corrected thermal estimates with probe readings. These are measurement accuracy scores, not percentages of correctly classified food items.

- **Detection:** 84.9% accuracy in live tests, rising to over 94% for the five most common foods. The hardest foods are visually similar dishes (such as lentil broth and vegetable soup) and layered dishes like lasagne.
- **Weight:** 91.4% accurate on freshly served plates and 79% on partly eaten plates, where food is often mixed together.
- **On-device:** on FoodSeg103, INFORM's segmentation (0.412 mIoU) is close to much larger models that can't run on a Raspberry Pi. It's the only method among those compared that also estimates weight, temperature and nutrition.

<div class="row">
    <div>
        {% include figure.liquid path="assets/img/INFORM/weights.png" title="Weight estimation accuracy" alt="Bar chart of weight estimation accuracy for five common NHS foods, served and returned" %}
    </div>
    <div>
        {% include figure.liquid path="assets/img/INFORM/NewcastleTestingSetup.jpg" title="Live testing setup" alt="INFORM prototype set up in a kitchen for testing" %}
    </div>
</div>
<div class="caption">
Left: weight accuracy on five common NHS foods, as served (blue) and returned (pink). Right: the live testing setup at Newcastle University.
</div>

## Built for real hardware

Moving from a research prototype to a product meant dealing with problems research papers often skip: inconsistent lighting, a strict height limit so the unit fits on existing food trolleys, durability, calibration and patchy hospital Wi-Fi. Everything runs locally on a Raspberry Pi 5, using at most 2.1 GB of memory and 4–12 W of power.

Speed matters when staff are processing a trolley of plates. Detection finishes **0.65 seconds** after the plate is put down, so it can be taken away straight away. Segmentation and weight estimation then run in the background in about 5 seconds. By comparison, even the smallest version of SAM 2.1 needs almost 22 seconds per plate on the same hardware.

## Who benefits?

INFORM is designed first for hospitals, where knowing what patients eat can directly improve outcomes. The same approach works anywhere food is served:

- **Schools:** understanding what children actually eat to design healthier, more appealing menus.
- **Restaurants and catering:** consistent portion control, quality monitoring and waste reduction.

<div class="row">
    <div>
        {% include figure.liquid path="assets/img/INFORM/benefits.png" title="INFORM benefits" alt="Diagram of the benefits of INFORM data for different stakeholders" %}
    </div>
</div>

## What's next

The next step is putting INFORM into the hands of real users in hospitals and gathering their feedback. Expanding the dataset to capture how differently the same dish can be served will improve the hardest cases. Further ahead are integration with connected kitchen equipment and a mobile app for real-time access.
