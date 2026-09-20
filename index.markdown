---
layout: page
title: Tools
---

Small browser-based tools I have built, mostly for computational chemistry. They
all run entirely in your browser -- nothing to install, and no data leaves your
machine.

<ul class="tool-grid">
  {%- for t in site.data.tools -%}
    {%- include tool-tile.html title=t.title url=t.url blurb=t.blurb thumb=t.thumb -%}
  {%- endfor -%}
  {%- for post in site.posts -%}
    {%- if post.tool -%}
      {%- assign tile_title = post.short_title | default: post.title -%}
      {%- include tool-tile.html title=tile_title url=post.url blurb=post.blurb thumb=post.thumb -%}
    {%- endif -%}
  {%- endfor -%}
</ul>

Write-ups that are not tools live under [Posts]({{ "/posts/" | relative_url }}).
