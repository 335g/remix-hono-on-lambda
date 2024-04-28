#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import MainStack from "../lib/main";

const app = new cdk.App();
const stack = new MainStack(app, "RemixHonoOnLambda", {
	env: { region: "ap-northeast-1" },
});
