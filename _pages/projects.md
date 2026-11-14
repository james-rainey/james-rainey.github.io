---
layout: page
title: Projects
heading: Projects
lead: Research from my postdoc and PhD.
permalink: /projects/
description: Research and side projects by James Rainey.
nav: true
nav_order: 1
wide: true
display_categories: [PostDoc, PhD] # add `fun` to show side projects
---

<div class="filter-bar" role="group" aria-label="Filter projects">
  <button class="filter-button" type="button" data-filter="all" aria-pressed="true">All</button>
  {% for category in page.display_categories %}
  <button class="filter-button" type="button" data-filter="{{ category }}" aria-pressed="false">{{ site.data.project_categories[category] | default: category }}</button>
  {% endfor %}
</div>

<div class="card-grid">
  {% for category in page.display_categories %}
    {% assign sorted_projects = site.projects | where: "category", category | sort: "importance" %}
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  {% endfor %}
</div>
