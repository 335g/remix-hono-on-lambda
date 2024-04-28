import * as cdk from "aws-cdk-lib";
import type { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";

class MainStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props: cdk.StackProps) {
		super(scope, id, props);

		const fn = new lambda.DockerImageFunction(this, "Fn", {
			code: lambda.DockerImageCode.fromImageAsset(
				path.join(__dirname, "../lambda/my-app"),
			),
			functionName: "my-app",
			timeout: cdk.Duration.minutes(10),
		});
		fn.addFunctionUrl({
			authType: lambda.FunctionUrlAuthType.NONE,
		});
	}
}

export default MainStack;
