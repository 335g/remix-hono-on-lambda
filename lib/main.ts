import * as cdk from "aws-cdk-lib";
import type { Construct } from "constructs";

class MainStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props: cdk.StackProps) {
		super(scope, id, props);
	}
}

export default MainStack;
