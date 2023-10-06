import formidable from "formidable";

export default function handler(request, response) {
  const form = formidable();
  form.parse(request, (err, fields, files) => {
    console.log("parse reults", { err, fields, files });
    const { email, password } = fields;
    console.log(email, password);
  });

  response.status(200).send(`
  <h1>hi</h1>
  <p>Hello</p>`);
}
