import glpk from "glpk.js";
import _ from "lodash";

function getInitialBase(problem) {
  return glpk.solve(createModelFromProblem(problem));
}

function createModelFromProblem(problem) {
  var subjectTos = createSubjectTos(problem.constraints);
  return {
    name: "LP",
    objective: {
      direction: glpk.GLP_MIN,
      name: "objective",
      vars: []
    },
    subjectTo: subjectTos
  };
}

function createSubjectTos(constraints) {
  var constraintCounter = 0;
  var subjectToResult = [];
  _.forEach(constraints, function(constraint) {
    subjectToResult.push({
      name: "constraint" + constraintCounter++,
      vars: createVars(constraint),
      bnds: createBounds(constraint)
    });
  });
  return subjectToResult;
}

function createVars(constraint) {
  var varsResult = [];
  _.mapKeys(constraint, function(value, key) {
    if (!isBound(key)) {
      varsResult.push({
        name: key,
        coef: value
      });
    }
  });
  return varsResult;
}

function isBound(key) {
  return key === "max" || key === "min" || key === "equalTo";
}

function createBounds(constraint) {
  var bounds = [];
  _.mapKeys(constraint, function(value, key) {
    if (isBound(key)) {
      bounds = {
        type: createType(key),
        ub: createBound(key, value, "max"),
        lb: createBound(key, value, "min")
      };
    }
  });
  return bounds;
}

function createType(key) {
  var type;
  if (key === "max") {
    type = glpk.GLP_UP;
  } else if (key === "min") {
    type = glpk.GLP_LO;
  } else {
    type = 5;
  }
  return type;
}

function createBound(key, value, type) {
  var bound;
  if (key === type || key === "equalTo") {
    bound = value;
  } else {
    bound = 0;
  }
  return bound;
}

export { getInitialBase };
