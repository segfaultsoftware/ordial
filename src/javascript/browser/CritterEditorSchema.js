module.exports = {
  "title": "Critter",
  "type": "object",
  "properties": {
    "type": {
      "type": "string",
      "enum": [
        "resource",
        "critter",
        "rock"
      ],
      "default": "critter"
    },
    "location": {
      "type": "object",
      "properties": {
        "x": {
          "type": "integer",
          "default": 25,
          "format": "range",
          "minimum": 0,
          "maximum": 40
        },
        "y": {
          "type": "integer",
          "default": 25,
          "format": "range",
          "minimum": 0,
          "maximum": 40
        }
      }
    },
    "vitals": {
      "type": "object",
      "properties": {
        "mana": {
          "type": "integer",
          "default": 250,
          "format": "range"
        },
        "counter": {
          "type": "integer",
          "default": 0
        },
        "decay": {
          "type": "integer",
          "default": 0
        }
      }
    },
    "color": {
      "type": "string",
      "enum": [
        "blue",
        "teal",
        "lavender",
        "purple",
        "orange",
        "pink",
        "black",
        "eggshell"
      ]
    },
    "direction": {
      "type": "string",
      "enum": [
        "EAST",
        "WEST",
        "NORTH",
        "SOUTH"
      ],
      "default": "NORTH"
    },
    "genes": {
      "type": "array",
      "title": "Genes",
      "format": "tabs",
      "uniqueItems": false,
      "items": {
        "type": "array",
        "title": "Gene",
        "headerTemplate": "{{ self.1 }}",
        "template": "{{ self.1 }}",
        "enum": [
          [
            "action",
            "REPRODUCE"
          ],
          [
            "action",
            "MOVE_FORWARD"
          ],
          [
            "condition",
            "resourceToTheRight"
          ],
          [
            "condition",
            "resourceInFront"
          ],
          [
            "condition",
            "manaUnder300"
          ],
          ["condition", "resourceBehind"],
          ["condition", "thingInFront"],
          ["condition", "thingToTheLeft"]
        ],
        "options": {
          "enum_titles": [
            "Reproduce",
            "Move Forward",
            "Resource to the Right",
            "Resource in Front",
            "Mana under 300",
            "resourceBehind",
            "thingInFront",
            "thingToTheLeft"
          ]
        }
      }
    }
  }
}