---
title: Family planning estimation tool (FPET)
description: Introduction to FPET.
sidebar:
  order: 0
  label: Introduction
  badge:
    text: Stub
    variant: caution
---


## Sites

- **Live:** [fpet.track20.org](https://fpet.track20.org)
- **Beta:** [beta.avstaging.org/FPET](https://beta.avstaging.org/FPET)

## Repositories

| Component | Repository |
| --- | --- |
| Client | [FPETClient](https://github.com/AvenirHealth-org/FPETClient/tree/beta) |
| Server | [FPET-Controller](https://github.com/AvenirHealth-org/FPET-Controller) |
| Calculation | [fpet2-model-worker](https://github.com/AvenirHealth-org/fpet2-model-worker) |

## Application

The client repo is a React web application that provides the user interface.

The server is a C# web application. It lets users log in, connect to public population and survey databases, create custom population and survey databases, create model calculation runs, and view results.

The calculation repo contains an R script that runs leontines fpet model calculations. The model runs on a users fileshare folder so the results and logs are written to azure file share that is setup for user runs. 
