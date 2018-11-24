{
     var variables=[];
     var structuralVariables=[];
     var artificalVariables=[];
     var logicalVariables=[];
     var baseVariables = [];
     var constraints=[];
     var originalConstraints=[];
     var objective;
     var target;
     var tempMap={};
     var tempConstraint;
     var logicalVariableCounter = 1;
     var artificalVariableCounter = 1;
     
     function addVariableName(variableName) {
     	variables.push(variableName);
        structuralVariables.push(variableName);
        if (variableName.includes("x")) {
        	artificalVariableCounter++;
        }
     }
     
     function addVariable(coefficient, variableName) {
     	validateVariable(variableName);
        tempMap[variableName] = tempMap[variableName] == undefined ? coefficient : tempMap[variableName]+=coefficient;
     }
     
     function validateVariable(variableName) {
     	if (!variables.includes(variableName)) {
        	throw new SyntaxError(variableName + " variable doesn't exist. You can use only: " + variables);
        }
     }
     
     function addConstraint(relation) {
     	var original = Object.assign({}, tempMap);
        original[transformRelation(relation)] = tempConstraint;
     	originalConstraints.push(original);
     	constraints.push(transformConstraint(tempMap, relation, tempConstraint));
        tempMap={};
     }
     
     function transformRelation(relation) {
     	var transformedRealtion;
     	if (relation === "<=") {
        	transformedRealtion = "max";
        } else if (relation === ">=") {
        	transformedRealtion = "min";
        } else {
        	transformedRealtion = "equalTo";
        }
        return transformedRealtion;
     }
     
     function transformConstraint(constraint, relation, tempConstraint) {
     	if (relation === "<=") {
        	var logicalVariableName = "y" + logicalVariableCounter++;
        	constraint[logicalVariableName] = 1;
            logicalVariables.push(logicalVariableName);
            baseVariables.push(logicalVariableName);
            variables.push(logicalVariableName);
        } else if (relation === ">=") {
        	var logicalVariableName = "y" + logicalVariableCounter++;
        	var artificalVariableName = "x" + artificalVariableCounter++;
            constraint[logicalVariableName] = -1;
            constraint[artificalVariableName] = 1;
            variables.push(logicalVariableName);
            variables.push(artificalVariableName);
            logicalVariables.push(logicalVariableName);
            artificalVariables.push(artificalVariableName);
            baseVariables.push(artificalVariableName);
        } else {
        	var artificalVariableName = "x" + artificalVariableCounter++;
        	constraint[artificalVariableName] = 1;
            artificalVariables.push(artificalVariableName);
            baseVariables.push(artificalVariableName);
            variables.push(artificalVariableName);
        }
        
        constraint["equalTo"] = tempConstraint;
        return constraint;
     }
     
     function addVariablesWithZeroValue() {
        for (var i = 0; i < variables.length; i++) {
        	addVariableIfUndefined(variables[i], constraints);
        }
        for (var i = 0; i < structuralVariables.length; i++) {
        	addVariableIfUndefined(variables[i], originalConstraints);
        }
     }
     
     function addVariableIfUndefined(varName, constraints) {
     	for (var i = 0; i < constraints.length; i++) {
            	if (constraints[i][varName] == undefined) {
                	constraints[i][varName] = 0;
                }
        }
     }
     
     function getResult() {
    	addVariablesWithZeroValue();
     	var result = {};
        result.originalForm = {
        	constraints: originalConstraints
        };
        result.standardForm = {
        	constraints: constraints
        };
        result.objective = objective;
        result.target = target;
        result.variables = variables;
        result.structuralVariables = structuralVariables;
        result.artificalVariables = artificalVariables;
        result.logicalVariables = logicalVariables;
        result.baseVariables = baseVariables;
     	return result;
     }
}

start = lp {return getResult();}

/* tokens */
identifier = token:([a-zA-Z]+[0-9]*)  { return token.join(''); }
number = token:[0-9]+ { return parseInt(token.join('')); }
relation = ("<=" / ">=" / "=")
target = targetDef:("minimize" / "maximize") {target = targetDef}
_ = [ \t\n\r]*
__ = [ \t\n\r]+

/* grammar */
lp = _ variableDef+ _ constraintDef+ _ objectiveDef _

variableDef = _ "var" __  variableName:identifier _ ";" _ {addVariableName(variableName);}

constraintDef = _ "s.t."  __ constraintName:identifier _ ":" _ 

linearExpression _ relation:relation _ linearExpression _ ";"  _ {addConstraint(relation);}

objectiveDef = _ target __ objectiveName:identifier _ ":" _ linearExpression _ ";" {objective = tempMap}

linearExpression = _ linearComponent _ ( _ linearComponent _ )*

linearComponent =  _ operator:[+-] _ coefficient:number _ "*" _ variableName:identifier _ {addVariable(operator !== "-" ? coefficient : coefficient * (-1), variableName);}
	 / _ coefficient:number _ "*" _ variableName:identifier _ {addVariable(coefficient, variableName);}
     / _ operator:[+-]* _ variableName:identifier _ {addVariable(operator == "-" ? -1 : 1, variableName);}
     /_ constraint:number _ {tempConstraint = constraint}