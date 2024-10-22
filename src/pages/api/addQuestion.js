
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Define the path to the JSON file
    const filePath = path.join(process.cwd(),'src','pages',"data", 'data.json');

    try {
      // Read the existing data from the file
      const jsonData = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(jsonData);

      // Get new data from the request body
      const newData = req.body;

      // Add the new data to the array
      data.push(newData);

      // Write the updated data back to the JSON file
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));

      // Send a response back to the client
      res.status(200).json({ message: 'Question saved successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while saving the data.' });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed.' });
  }
}
