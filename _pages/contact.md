---
layout: page
title: Contact
heading: Contact
lead: Questions about my research, a collaboration idea, or just want to say hello? Drop me a message.
permalink: /contact/
description: Get in touch with James Rainey.
nav: true
nav_order: 4
---

{% if site.contact_form_endpoint %}
{% assign formspree_id = site.contact_form_endpoint | split: "/" | last %}

<div class="contact">
  <!-- Shown by the Formspree script. Without JavaScript the form posts normally. -->
  <div class="form-message form-message--success" data-fs-success role="status">
    Thanks, your message is on its way. I'll get back to you soon.
  </div>
  <div class="form-message form-message--error" data-fs-error role="alert"></div>

  <form class="contact-form" id="contact-form" action="{{ site.contact_form_endpoint }}" method="POST">
    <label for="contact-email">Your email</label>
    <input id="contact-email" type="email" name="email" autocomplete="email" required data-fs-field>
    <span class="field-error" data-fs-error="email"></span>

    <label for="contact-message">Message</label>
    <textarea id="contact-message" name="message" rows="7" required data-fs-field></textarea>
    <span class="field-error" data-fs-error="message"></span>

    <!-- Honeypot: hidden from people, filled in by bots, rejected by Formspree. -->
    <input type="text" name="_gotcha" class="contact-honeypot" tabindex="-1" autocomplete="off" aria-hidden="true">
    <input type="hidden" name="_subject" value="Message from jamesrainey.co.uk">

    <button class="btn btn-primary" type="submit" data-fs-submit-btn>
      <i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Send
    </button>
  </form>
</div>

<script>
  window.formspree = window.formspree || function () { (formspree.q = formspree.q || []).push(arguments); };
  formspree('initForm', { formElement: '#contact-form', formId: '{{ formspree_id }}', useDefaultStyles: false });
</script>
<script defer src="{{ site.third_party_libraries.formspree_ajax.url.js }}" integrity="{{ site.third_party_libraries.formspree_ajax.integrity.js }}" crossorigin="anonymous"></script>
{% else %}
The contact form is not set up yet.
{% endif %}
