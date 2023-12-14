# Engineering Symbols

## 🦢 Table of Contents

-   [⚙️ Purpose](#⚙️-purpose)
-   [💃 Intended Audience](#💃-intended-audience)
-   [Quick Start](#quick-start)
    -   [📦 Install](#📦-install)
    -   [🪭 Available Scripts](#🪭-available-scripts)
-   [🧵 Engineering Symbols Documentation](#🧵-engineering-symbols-documentation)
-   [👩‍🏫 Term clarifications](#👩‍🏫-term-clarifications)

## ⚙️ Purpose

SVG engineering symbols serve as scalable and interactive graphical representations of various engineering concepts, components, and processes. The purpose of these symbols is to provide a standardized and versatile format for depicting engineering elements in a visually clear and easily shareable manner. SVG (Scalable Vector Graphics) ensures that these symbols maintain high-quality resolution at any size, making them suitable for diverse applications, from technical documentation to online platforms.

## 💃 Intended Audience

The intended audience for SVG engineering symbols includes engineers, designers, educators, and anyone involved in conveying or understanding engineering information. These symbols are particularly valuable for technical documentation, schematic diagrams, educational materials, and web applications where dynamic and responsive visualizations are crucial. By catering to a broad audience within the engineering field, SVG engineering symbols aim to enhance communication and comprehension of complex engineering concepts across various platforms and contexts.

# Quick Start

## 📦 Install

```bash
npm install
```

## 🪭Available Scripts

_In the project directory, you can run:_

```bash
npm run prettier:write
```

_Launches the prettier for format a file in-place<br>_

```bash
npm run checkcode
```

_Launches the lint checkcode in the interactive watch mode to chek code via **lint**, **ts:test** & **prettier**<br>_

# 🧵 Engineering Symbols Documentation

🍯 [Engineering symbols web](https://github.com/equinor/engineering-symbols/blob/master/web/README.md)

🧸 [Engineering symbols package](https://github.com/equinor/engineering-symbols/blob/master/package/README.md)

This is a repository for the reference implementation of a library for machine readable symbols for use in digital diagrams as well as the drafts for an information model for machine readable engineering symbols.

# 👩‍🏫 Term clarifications

-   **Symbol library (SL)** - A service for management and offering of versioned collections of engineering symbols.

-   **Engineering symbols (ES)** - Our web-collection of vector-based engineering symbols provides with an extensive range of graphic components that can be used to create professional-grade engineering diagrams and schematics.

-   **Symbol** - Artifact intended to be represent physical engineering objects in digital drawing surfaces and presentation surfaces. It can exist in several collections at once if it contains a different state.

-   **Path** - Element is the most powerful element in the SVG library. Paths create complex shapes by combining multiple straight lines or curved lines.

-   **ViewBox** - Attribute defines the position and dimension, in user space, of an SVG viewport
-   **Width/Height** - Attribute defines the horizontal length of an element in the user coordinate system.

-   **Connector/Annotation** - A device or component used to join "circuits" together.
-   **Metadata** - Data that provides information about other data. Metadata helps users and systems understand and manage the characteristics, properties, and context of the data it describes.

-   **Symbols API** - Is a set of rules and protocols that allow specific API developed for a particular software or service that deals with symbols, icons.

-   **Collection** - Grouping or set of symbols, often used for specific purposes
-   **Symbol livecycle** - How symbols are created, used, and managed within an Engineering symbols. Like: draft, waiting for approval, approved, rejected

-   **User** - Individuals or households who use or consume products or services. (Customers)
-   **Contributor** - Are individuals or entities who actively participate in creating, developing, or adding value to a project
-   **Reviewer (super admin)** - Reviewers are individuals for evaluating, with the aim of providing feedback, approval, or reject in ES.
