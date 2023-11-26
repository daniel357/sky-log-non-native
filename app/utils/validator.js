export default function validate(
  title,
  canopy,
  plane,
  dropzone,
  datetime,
  description
) {
  if (title && canopy && plane && dropzone && datetime && description) {
    return (
      title.toString() !== "" &&
      canopy.toString() !== "" &&
      plane.toString() !== "" &&
      dropzone.toString() !== "" &&
      datetime.toString() !== "" &&
      description.toString() !== ""
    );
  } else {
    return false;
  }
}
