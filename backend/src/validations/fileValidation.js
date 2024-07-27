
const { z } = require('zod');

const fileUploadSchema = z.object({
  files: z.array(z.object({
    path: z.string(),
    mimetype: z.string().regex(/^application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet$/, 'Invalid file type'),
  })),
  type: z.enum(['attendance', 'project-review', 'assessment', 'project-submission', 'linkedin-post']),
});

module.exports = {
  fileUploadSchema,
};