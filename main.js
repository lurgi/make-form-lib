import { z } from "zod";

const emailSchema = z.string().email();
const passwordSchema = z.string().min(12);

// user-side
setupForm({
  form: document.querySelector("#login-form"),
  fields: {
    email: emailSchema,
    password: passwordSchema,
  },
  async onSubmit(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("onSubmit", data);
        resolve();
      }, 3000);
    });
  },
});

// library-side
function setupForm({ form, fields, onSubmit }) {
  let isSubmitting = false;

  // const submitBtn = form.querySelector("button[type='submit']");
  // if (!submitBtn) console.error("submit button is missing");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }
    isSubmitting = true;
    form.setAttribute("data-submitting", true);

    const data = {};
    const errors = {};
    let valid = true;

    Object.keys(fields).forEach((key) => {
      const value = form[key].value;
      const schema = fields[key];
      const result = schema.safeParse(value);
      const errorElement = form.querySelector(`#${key}-error`);
      if (result.success) {
        if (errorElement) errorElement.innerHTML = "";
      } else {
        valid = false;
        errors[key] = result.error;
        if (errorElement) {
          errorElement.innerHTML = result.error.issues[0].message;
        }
      }
      data[key] = value;
    });

    if (valid) {
      await onSubmit(data);
    } else {
      console.log("error", errors);
    }
    isSubmitting = false;
    form.setAttribute("data-submitting", false);
  });
}
