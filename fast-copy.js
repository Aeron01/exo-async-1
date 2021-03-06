const fsPromises = require('fs/promises')

if (process.argv.length !== 4) {
  console.log(chalk.red('Usage: node fast-copy.js ./src ./dst'))
  process.exit(1)
}

const main = async () => {
  try {
    const dirDst = await fsPromises.mkdir(process.argv[3])
  } catch (e) {
    console.error(e.message)
  }

  try {
    const dirSrc = await fsPromises.opendir(process.argv[2])
    for await (const elem of dirSrc) {
      await fsPromises.copyFile(`${process.argv[2]}/${elem.name}`, `${process.argv[3]}/${elem.name}`)
    }
  } catch (e) {
    console.error(e.message)
  }
}

main()