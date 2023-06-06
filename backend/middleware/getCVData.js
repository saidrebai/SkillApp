// const dimensions = async (result, dataToSearch) => {
//   if (!result || !result.Blocks) {
//     throw new Error("Invalid Textract result object");
//   }

//   let foundWord = false;
//   let wordIndex = -1;

//   for (let block of result.Blocks) {
//     if (block.BlockType !== 'LINE') continue;

//     for (let word of block.Words) {
//       wordIndex++;

//       if (word.Text.toUpperCase() === dataToSearch) {
//         foundWord = true;
//         break;
//       }
//     }

//     if (foundWord) break;
//   }

//   if (!foundWord) {
//     throw new Error(`Cannot find word '${dataToSearch}'`);
//   }

//   const word = result.Blocks[Math.floor(wordIndex / 10)].Words[wordIndex % 10];

//   return {
//     DimensionTop: word.Geometry.BoundingBox.Top,
//     DimensionLeft: word.Geometry.BoundingBox.Left,
//   };
// };


// const getCVData = async (result) => {
//   try {
//     // const dimensionsName = await dimensions(result, "LANGUAGES");
//     const dimensionsSkills = await dimensions(
//       result,
//       "PRINCIPALES COMPÉTENCES" && "TOP SKILLS"
//     );

//     const relevantLines = result.Lines.slice(1).filter(
//       (line) =>
//         line.Words[0].Top > dimensionsSkills.DimensionTop &&
//         line.Words[0].Left < dimensionsSkills.DimensionLeft 
//       // line.Words[0].Top < dimensionsName.DimensionTop
//     );

//     const lines = relevantLines.map((line) => line.LineText.trim());
//     const skills = lines.map((line) => line.split(",")).flat();

//     const relevantData = {
//       skills,
//     };

//     console.log(relevantData);
//     return relevantData;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

// module.exports = getCVData;

const dimensions = async (result, dataToSearch) => {
  if (!result || !result.Lines) {
    throw new Error("Invalid Textract result object");
  }

  const line = result.Lines.find((line) =>
    line.LineText.toUpperCase().includes(dataToSearch.toUpperCase())
  );

  if (!line) {
    throw new Error(`Cannot find line containing '${dataToSearch}'`);
  }

  return {
    DimensionTop: line.Words[0].Top,
    DimensionLeft: line.Words[0].Left,
  };
};

const getCVData = async (result, ) => {
  const wordsToExtract = ["JavaScript", "Python","Bash","linux","Html","Css","Docker","Devops","mySQL","Wordpress","Php","SQL","php","PHP",
"javaScript","js","Js","python","bash","Linux","HTML","html","HTML5","CSS","docker","devops","DevOps","wordpress","kubernetes","Kubernetes","Laravel","laravel",
"LARAVEL","wordPress","WordPress"];
  try {
    const relevantData = {
      skills: [],
    };

    result.Lines.forEach((line) => {
      const words = line.LineText.trim().split(/[ ,]+/);
      wordsToExtract.forEach((word) => {
        if (words.includes(word)) {
          relevantData.skills.push(word);
        }
      });
    });

    console.log(relevantData);
    return relevantData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
// const wordsToExtract = ["JavaScript", "Python", "React", "Node","Express","Mongo","Bash","linux","Html","Css","Docker","Devops","mySql","Wordpress","Php"];
// const result = ... // Textract result object
// const wordsToExtract = ["JavaScript", "Python", "React", "Node.js"];

// const relevantData = await getCVData(result, wordsToExtract);


module.exports = getCVData;
