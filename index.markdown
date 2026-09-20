---
layout: page
title: Tools
---

Small browser-based tools I have built, mostly for computational chemistry. They
all run entirely in your browser -- nothing to install, and no data leaves your
machine.

<ul class="tool-list">
  {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
  {%- for t in site.data.tools -%}
  <li class="tool-item">
    <h3 class="tool-name"><a href="{{ t.url | relative_url }}">{{ t.title | escape }}</a></h3>
    <p class="tool-blurb">{{ t.blurb | escape }}</p>
    <span class="post-meta">{{ t.date | date: date_format }}</span>
  </li>
  {%- endfor -%}
  {%- for post in site.posts -%}
    {%- if post.tool -%}
  <li class="tool-item">
    <h3 class="tool-name"><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h3>
    <p class="tool-blurb">{{ post.blurb | escape }}</p>
    <span class="post-meta">{{ post.date | date: date_format }}</span>
  </li>
    {%- endif -%}
  {%- endfor -%}
</ul>

Write-ups that are not tools live under [Posts]({{ "/posts/" | relative_url }}).
