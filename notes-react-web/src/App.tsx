import { FC, useState } from 'react';
import { useHistory } from 'react-router';
import CardNote from './components/cardNote';
import Header from './components/header';
import noNotes from './assets/imgs/no-notes.svg';

interface Note {
  text: string
}
const App: FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function newNote() {
    history.push('/new')
  }

  return (
    <div className="bg-gray-100 h-screen w-screen">
      <div className="container mx-auto">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {notes.map((note) => <CardNote />)}
        </div>
        {notes.length === 0 && <div className="w-full flex flex-col space-y-5 justify-center items-center mt-48">
          <img src={noNotes} className="w-64" alt="no images" />
          <button type="button" onClick={newNote} className="text-2xl font-semibold "> Add new note</button>
        </div>}
        {loading && <div className="w-full flex justify-center items-center mt-48">
          <h2 className="text-3xl"> Loading...</h2>
        </div>}
      </div>

    </div>
  );
}

export default App;
