---
layout: page
title: TRAIT
description: A <b>TR</b>usted Medi<b>A</b> D<b>I</b>s<b>T</b>ribution Framework
main_title: <h1 align=center>TRAIT - A <b>TR</b>usted Medi<b>A</b> D<b>I</b>s<b>T</b>ribution Framework</h1><hr>
main_description: <h2 align=center>Building Trust in Digital Media</h2>
img: assets/img/TRAIT/kodim23.png
importance: 3
category: TBC #PostDoc
---

<style>
h2   {
     color: #429435;
     font-size:180%;
     }
</style>

---

In today’s world, seeing is no longer believing.
With deepfakes and advanced AI image editing, anyone can create highly realistic fake media, and public trust in digital content is eroding fast.

*Based on the paper TRAIT: A Trusted Media Distribution Framework {%cite rainey2023trait %}*

<br>
## 🎯 Goal
---
Our goal with TRAIT was simple but ambitious:
to make digital media trustworthy again by ensuring integrity, authenticity, and provenance from creation to consumption.

TRAIT is a framework for trusted media distribution that combines:

- 🧾 A universal metadata schema: built in XML and implemented using the Extensible Metadata Platform(XMP), so it can embed directly into any media file.

- 🔗 A blockchain core: using Hyperledger Fabric to record ownership, copyright, and modification history.

- 🧠 AI-powered manipulation detection: integrating modern image forensics algorithms (like MVSS-Net) to flag tampering.

- 💾 Distributed storage: via IPFS, ensuring transparency and decentralisation.

Think of TRAIT as a digital “chain of custody” for media files, every edit, owner, and verification is securely logged and traceable.

<br>
## ⚙️ How It Works
---
- **Register:**
A creator uploads an image through the TRAIT web interface.
A unique Media ID is generated, metadata is embedded, and the record is added to the blockchain.

- **Verify:**
When another user uploads or searches for an image, TRAIT compares it to existing records.
If the image has been altered, the manipulation engine highlights what changed and when.

- **Distribute:**
All verified versions are stored on IPFS, with transparent transaction history available to anyone.

<br>
## 🌍 Real-World Use Cases
---
- 📸 Protecting Photographers

A photographer registers their original image on TRAIT.
When someone tries to upload an edited version, the system detects the manipulation, flags copyright infringement, and stops false registration.

- 🖼️ Authenticating Artwork

An art collector uses TRAIT to verify that a painting is genuine.
A digital photo of the piece is compared against the original’s record, revealing whether it’s authentic or a forgery.

<br>

## 🔍 Why It Matters
---
TRAIT bridges the gap between media creation and trustworthy distribution.
Unlike existing industry efforts such as Adobe’s C2PA, TRAIT not only records provenance, it actively detects tampering and stores data decentrally.

We see TRAIT supporting industries like:

- Digital media and journalism

- Galleries, libraries, archives, and museums (GLAM)

- Insurance and intellectual property management

<br>

## 🔑 Key Takeaways
---
TODO

<br>

## 🔮 Looking Ahead
---
TODO

