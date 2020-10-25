# Jest Generator

Repo consists of:

- Deno script to auto generate jest UT starter
- CDK code to deploy script into S3 bucket

## Current Features:

- Currently, only mocks jest dependencies based on imports and sets up describe function

## Planned Features:

- Generate a basic template of success-failure tests for lambda
- Deep mocking of dependencies used (if possible)

## Instructions for use:

### 1. Create your deployment env if you want to use your own S3 bucket to store your Deno script object

- Run `aws configure`
- Add user's ACCESS KEY ID and SECRET KEY to create default profile
- Run `cdk bootstrap aws://<account>/<region>` in `deploy` folder if deploying env for the first time
- Run `deploy` from `root` (or `deploy`) folder to deploy your CDK stack

Note: Alternatively, the object url for the script can be shared between multiple people

### 2. Install deno on your machine

Follow the instructions [here](https://deno.land/manual@v1.4.6/getting_started/installation)

### 3. Run the deno run command as follows:

Command syntax:

`deno run --allow-read --allow-write <s3-url-to-script> <input-file-name> <output-file-name>`

Command example:

- `deno run --allow-read --allow-write https://jest-generator.s3.ap-south-1.amazonaws.com/index.bundle.js handler.ts handler.spec.ts`

### 4. You can create an alias to run this command without typing the whole thing

In your powershell profile, you can add the following alias

```
Function SpecGen($readFile, $writeFile) {
    deno run --allow-read --allow-write https://jest-generator.s3.ap-south-1.amazonaws.com/index.bundle.js $readFile $writeFile;
}

Set-Alias spec-gen SpecGen
```

### 5. You can now run the command with your alias

Example usage:

```
spec-gen handler.ts handler.spec.ts
```

## Deploying changes to deno script to S3 bucket

Run build (also cleans up previous dist):

- `npm run build`

Run deploy:

- `npm run deploy`

You should now be able to see your new deno script in your S3 bucket

## Important Notes:

- Meant to be a starting point for the generated test setup, you will then need to add on top of that
- May generate incorrectly or fail but any output will only be added to end of existing files and not overwrite them
- You can remove the generated code if it doesn't and raise an issue with input and expected output (if possible), and I can work on improving the script
