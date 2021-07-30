import fhirpath from 'fhirpath';

function getLabel(bundle, id) {
  // attempt to get MRN and name with fhirpath
  const patient = fhirpath.evaluate(bundle, "Bundle.descendants().resource.where(resourceType='Patient')")[0];
  if (patient) {
    const mrn = patient.id;
    const name = patient.name[0].text;

    const isMasked = fhirpath.evaluate(patient, 'Patient.identifier.extension.valueCode')[0] === 'masked';

    // if both MRN and name -- return string w / both
    if (typeof mrn === 'string' && mrn.length > 0 && typeof name === 'string' && name.length > 0 && !isMasked) {
      const label = mrn.concat(': ').concat(name);
      return label;
    }
    // if either MRN or name -- return string / the available one
    if (typeof name === 'string' && name.length > 0) {
      return name;
    }
    // if neither MRN nor name -- "Patient " + patient_resource_id
    if (typeof mrn === 'string' && mrn.length > 0) {
      return mrn;
    }
  }

  // if no patient resource ID -- return "Patient " + props.id
  let label = 'Patient';
  label = label.concat(' ').concat(id.toString());
  return label;
}

export default getLabel;
