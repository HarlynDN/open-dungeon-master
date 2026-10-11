import ts from 'typescript';
// Freeze the original save inputs, including flags, DCs, turn handles, freeform
// detail strings and record/no-record decisions. Remove only additive captions.
export function saveCallContracts(files,sourceOf){
 const rows=[];const printer=ts.createPrinter({removeComments:true});
 for(const file of files){const source=ts.createSourceFile(file,sourceOf(file),ts.ScriptTarget.Latest,true);
 const normalize=root=>{const result=ts.transform(root,[ctx=>{const visit=node=>{
  if(ts.isSpreadAssignment(node)&&ts.isCallExpression(node.expression)&&node.expression.expression.getText(source)==='saveRoll')return ts.factory.createPropertyAssignment('detail',node.expression.arguments[0]);
  if(ts.isCallExpression(node)&&node.expression.getText(source)==='saveRoll')return node.arguments[0];
  if(ts.isCallExpression(node)&&node.expression.getText(source)==='rollFeatureSave'&&node.arguments.length>6){const args=node.arguments.slice(0,6);while(args.at(-1)?.getText(source)==='undefined')args.pop();return ts.factory.updateCallExpression(node,node.expression,node.typeArguments,args);}
  return ts.visitEachChild(node,visit,ctx);
 };return node=>ts.visitNode(node,visit);}]);const text=printer.printNode(ts.EmitHint.Unspecified,result.transformed[0],source);result.dispose();return text;};
 const walk=node=>{if(ts.isCallExpression(node)&&['rollCharacterSave','rollEnemySave','rollFeatureSave'].includes(node.expression.getText(source)))rows.push({file,call:normalize(node)});ts.forEachChild(node,walk);};walk(source);
 }return rows;
}
