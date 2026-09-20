---
layout: page
title: Posts
permalink: /posts/
---

<ul class="post-list">
  {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
  {%- for post in site.posts -%}
    {%- unless post.tool -%}
  <li>
    <span class="post-meta">{{ post.date | date: date_format }}</span>
    <h3><a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h3>
  </li>
    {%- endunless -%}
  {%- endfor -%}
</ul>

<p class="rss-subscribe">subscribe <a href="{{ "/feed.xml" | relative_url }}">via RSS</a></p>
