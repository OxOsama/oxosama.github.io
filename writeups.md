---
layout: page
title: CTF Writeups
permalink: /writeups/
---

## CTF Writeups

{% for post in site.writeups %}
### <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
<small>{{ post.date | date: "%B %d, %Y" }}</small>

{{ post.excerpt }}
{% endfor %}
