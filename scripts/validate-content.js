const fs = require("fs");
const path = require("path");

const techsPath = path.join(__dirname, "../data/techs.json");
const conceptsPath = path.join(__dirname, "../data/concepts.json");

let hasErrors = false;

function reportError(msg) {
  console.error(`❌ ${msg}`);
  hasErrors = true;
}

try {
  const techs = JSON.parse(fs.readFileSync(techsPath, "utf-8"));
  const concepts = JSON.parse(fs.readFileSync(conceptsPath, "utf-8"));

  const techIds = new Set();
  const conceptIds = new Set();
  const techConceptSlugs = new Set();

  // Validate Technologies
  techs.forEach((t) => {
    if (techIds.has(t.id)) {
      reportError(`Duplicate technology ID: "${t.id}"`);
    }
    techIds.add(t.id);
  });

  if (!hasErrors) {
    console.log("✓ Technologies valid");
  }

  // Validate Concepts
  concepts.forEach((concept) => {
    if (conceptIds.has(concept.id)) {
      reportError(`Duplicate concept ID: "${concept.id}"`);
    }
    conceptIds.add(concept.id);

    const techSlugKey = `${concept.tech}:${concept.slug}`;
    if (techConceptSlugs.has(techSlugKey)) {
      reportError(`Duplicate slug "${concept.slug}" for tech "${concept.tech}"`);
    }
    techConceptSlugs.add(techSlugKey);

    if (!techIds.has(concept.tech)) {
      reportError(
        `Concept "${concept.id}" references non-existent tech "${concept.tech}"`
      );
    }
  });

  if (!hasErrors) {
    console.log("✓ Concepts valid");
  }

  // Validate Markdown paths
  concepts.forEach((concept) => {
    const cleanPath = concept.mdPath.startsWith("/")
      ? concept.mdPath.slice(1)
      : concept.mdPath;
    const fullMdPath = path.join(__dirname, "../public", cleanPath);
    if (!fs.existsSync(fullMdPath)) {
      reportError(
        `Missing Markdown file for concept "${concept.id}": "${concept.mdPath}"`
      );
    }
  });

  if (!hasErrors) {
    console.log("✓ Markdown paths valid");
  }

  // Validate Related concept references
  concepts.forEach((concept) => {
    if (concept.related) {
      concept.related.forEach((relatedId) => {
        if (!conceptIds.has(relatedId)) {
          reportError(
            `Concept "${concept.id}" references invalid related concept ID: "${relatedId}"`
          );
        }
      });
    }
  });

  if (!hasErrors) {
    console.log("✓ Related concept references valid");
  }

  if (hasErrors) {
    console.error("\nValidation failed with errors.");
    process.exit(1);
  } else {
    console.log(`\nAll ${techs.length} technologies and ${concepts.length} concepts passed verification.`);
  }
} catch (err) {
  console.error("Content validation crashed:", err);
  process.exit(1);
}
