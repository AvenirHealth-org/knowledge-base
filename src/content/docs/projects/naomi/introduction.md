---
title: Naomi
description: Bayesian small-area estimation of district-level HIV epidemic indicators in sub-Saharan Africa, developed for UNAIDS.
sidebar:
  order: 0
  label: Introduction
  badge:
    text: Stub
    variant: caution
---

Naomi is a Bayesian small-area estimation modelling tool to estimate
district-level HIV epidemic indicators in sub-Saharan Africa.

Developed for UNAIDS it is used once a year as part of the estimates process.

It consists of several repos

* [hint](https://github.com/hivtools/hint) - frontend and Kotlin backend
* [hintr](https://github.com/hivtools/hintr) - R backend and async running
* [naomi](https://github.com/mrc-ide/naomi/) - R model
* [hint-deploy-azure](https://github.com/hivtools/hint-deploy-azure) - IaC setup on Azure
* [hintr-active-jobs](https://github.com/hivtools/hintr-active-jobs) - Azure function app for listing acting jobs in queue (for scaling workers)
* [hint-db](https://github.com/hivtools/hint-db) - database docker image and flyway migrations
* [naomi.docker](https://github.com/hivtools/naomi.docker) - docker base image for hintr

And some now defunct bits (after move to azure)

* [hint-proxy](https://github.com/hivtools/hint-proxy) - nginx reverse proxy
* [hint-deploy](https://github.com/hivtools/hint-deploy) - on-prep deployment tool using consellation
