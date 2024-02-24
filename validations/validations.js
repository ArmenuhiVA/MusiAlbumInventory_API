const Ajv = require("ajv");
const ajv = new Ajv({allErrors: true});

const albumSchema = {
    type: "object",
    properties: {
      title: {
        type: "string",
      },
      artist: {
        type: "string",
      },
     
      year: {
            type: "number", 
            minimum: 1000,
            maximum: 9999
        },
    },
    required: ["title", "artist", "year"],
};

function validate(schema) {
    return (req, res, next) => {
      const valid = ajv.validate(schema, req.body)
      if (!valid) {
        console.log(ajv.errors);
        res.status(400).json({ message: ajv.errors })

      } else {
        next()
      }
    };
  }

  module.exports = {
    albumSchema,
    validate
  }
    
    

  