import ts from 'typescript';
// Capture original calls in the changed producers, including English details,
// dice, DCs, results and visibility. Only caption metadata is projected away.
export function specialCallContracts(files,sourceOf){
 const rows=[],printer=ts.createPrinter({removeComments:true});
 for(const file of files){const source=ts.createSourceFile(file,sourceOf(file),ts.ScriptTarget.Latest,true);
 const caption=node=>ts.isCallExpression(node)&&['specialRoll','saveRoll','saveCaption','checkRoll','initiativeRoll'].includes(node.expression.getText(source));
 const normalize=root=>{const result=ts.transform(root,[ctx=>{const visit=node=>{
  if(ts.isShorthandPropertyAssignment(node)&&node.name.text==='detail')return ts.factory.createPropertyAssignment('detail',node.name);
  if(ts.isPropertyAssignment(node)&&node.name.getText(source)==='detail'&&file==='src/lib/dm/endurance.ts'&&ts.isConditionalExpression(node.initializer))return ts.factory.createPropertyAssignment('detail',ts.factory.createCallExpression(ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('input'),'detail'),undefined,[ts.factory.createIdentifier('hour')]));
  if(ts.isParenthesizedExpression(node)&&ts.isConditionalExpression(node.expression))return ts.visitNode(node.expression,visit);
  if(ts.isSpreadAssignment(node)&&caption(node.expression))return ts.factory.createPropertyAssignment('detail',node.expression.arguments[0]);
  if(ts.isSpreadAssignment(node)&&node.expression.getText(source).includes('presentation:'))return undefined;
  if(ts.isPropertyAssignment(node)&&node.name.getText(source)==='presentation')return undefined;
  if(caption(node))return node.arguments[0];
  if(ts.isConditionalExpression(node)&&ts.isTypeOfExpression(node.condition.left??{})&&node.condition.left.expression.getText(source).match(/^(?:detail|input.detail)$/)&&node.condition.operatorToken.kind===ts.SyntaxKind.EqualsEqualsEqualsToken&&node.condition.right.getText(source)==='"string"')return node.whenTrue;
  if(ts.isCallExpression(node)&&node.expression.getText(source)==='rollHealing'&&node.arguments.length>4)return ts.factory.updateCallExpression(node,node.expression,node.typeArguments,node.arguments.slice(0,4));
  return ts.visitEachChild(node,visit,ctx);
 };return node=>ts.visitNode(node,visit);}]);const text=printer.printNode(ts.EmitHint.Unspecified,result.transformed[0],source);result.dispose();return text;};
 const walk=node=>{if(ts.isCallExpression(node)&&['rollCard','dmRoll','insertRoll','characterSave','publicDie','hourlyConSaves','rollHealing'].includes(node.expression.getText(source)))rows.push({file,call:normalize(node)});ts.forEachChild(node,walk);};walk(source);
 }return rows;
}
