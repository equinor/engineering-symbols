# Executive Summary

This guide discusses Digital Engineering Symbols - digital drawings of engineering parts used in digital designs.

In order to streamline the creation of these diagrams, we suggest improvements in both the layout and design of symbols, with special attention to their orientation, direction, and connection points, also called ports or terminals.

We recommend utilizing a subset of the Extended Backus-Naur form (EBNF) defined in the SVG standard to describe the visual components in order to ensure standardization and portability.

The ultimate goal is a well-crafted Digital Engineering Symbol, clearly indicating its orientation, direction, and ports, which greatly enhances its utility in digital diagrams.

# Digital Engineering Symbols

## What is a symbol

In this context, a `symbol` is intended to be understood as a digital sketch that represents engineering objects in digital spaces.

### A Valve symbol

![A valve](/Models/docs/PV003B-LargeConnectors.svg)

Crafting a diagram for a non-trivial model is a complex task, similar to solving a challenging puzzle like the [Brick factory problem](https://en.wikipedia.org/wiki/Tur%C3%A1n%27s_brick_factory_problem). To simplify this process and make it more cost-effective, we aim to improve symbol layout and recognition.

For a digital symbol, we have identified these key requirements:

-   Layout
    -   Orientation
    -   Direction
    -   Ports
-   Rendering
    -   Portability

### A quick word about Graph forcing algorithms

The mechanisms we recommend be used to do most of the layout work are called graph forcing algorithms and we need to say a few words about what they are, how they function and what makes the function well before moving on.

A Graph forcing algorithm functions based on rules and heuristics. Very generic rules could be defined as "don't let any nodes occupy the same area" or "prioritize layouts where fewer edges cross". As we define more specialized rules more use-case specific configurations can me produced, the rule set "First, place all nodes that aren't pointed at in a column, then place node that are pointed at by already placed nodes to the right of the first column and repeat until all nodes are placed" will produce a directed layout flowing left to right. Suited for representing signal propagation, hierarchical structures or decision trees etc.

In short, if we make writing good rules easy and accessible while also ensuring that the symbols used to represent the nodes add to the value we are able to generate from a rule, graph forcing algorithms can be used to represent complex structured models.

# Requirements

## Layout

### **Orientation**

The orientation or rotation of a symbol should be deliberately chosen to enhance its readability and comprehension. A symbol's orientation greatly influences the possible layouts, hence a thoughtful decision can improve the overall effectiveness of the diagram.

### **Direction**

A well-defined flow direction within a symbol helps in improving predictability and efficiency in the design of diagrams. It guides where to place nodes and reduces the number of ineffective layouts, thus simplifying the design process.

### **Ports**

Ports are the connection points between symbols. They signify the points where input and output flows connect to the symbol. Designing accurate and well-located ports enhances the information density in the symbol, making it more recognizable and useful. Ports can also indicate if the symbol should be mirrored, especially if the component has a flow direction different from the general direction for the layout.

## **Rendering**

### **Portability**

To ensure that symbols can be used across different platforms without loss of quality or meaning, we recommend using the [EBNF](https://www.w3.org/TR/SVG/paths.html#PathDataBNF) ([Extended Backus-Naur form](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form#:~:text=EBNF%20is%20a%20code%20that,combined%20into%20a%20legal%20sequence.)) method for drawing symbols. EBNF serves as a simple syntax for how lines are drawn in SVG's, making it easy to represent a symbol as a graphical element in various environments. This way, our symbols can be versatile and widely usable.

# Summary

In conclusion, a digital engineering symbol is a portable and versatile graphical element, designed with thoughtfulness about its orientation, direction, and connection points, thereby enhancing its usability in digital diagrams.
