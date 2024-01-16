import React, { useState, useEffect } from 'react';
import ThemeContext from './ThemeContext';
import './App.css';
import { toWords, formatCentsInWords } from './fr';
import ThemeToggleButton from './ThemeToggleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');
  const [theme, setTheme] = useState('light');
  const [showCopyButton, setShowCopyButton] = useState(false);


  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const normalizeAmount = (input) => {
    const trimmedInput = input.trim();
    const noSpaces = trimmedInput.replace(/\s/g, '');
    const noDots = noSpaces.replace(/\./g, '');
    const normalizedInput = noDots.replace(/,/g, '.');
    return normalizedInput;
  };

  const convertToWords = () => {
    const normalizedAmount = normalizeAmount(amount);

    document.getElementById('convertButton').classList.add('animate');
    setTimeout(() => {
      document.getElementById('convertButton').classList.remove('animate');
    }, 1000); // Remove the class after 1 second

    if (!isNaN(normalizedAmount) && parseFloat(normalizedAmount) > 0) {
      const [wholePart, decimalPart] = normalizedAmount.split('.');
      const convertedWholePart = toWords(parseFloat(wholePart));
      const convertedDecimalPart = decimalPart ? formatCentsInWords(parseFloat(decimalPart)) : 'zéro';
      if (convertedDecimalPart === "zéro")
        setResult(`${convertedWholePart} dirhams`);
      else
        setResult(`${convertedWholePart} dirhams et ${convertedDecimalPart} centimes`);
    } else {
      setResult('Veuillez entrer un montant valide.');
    }
    setShowCopyButton(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    // Add a class to the button to trigger the animation
    document.getElementById('copyButton').classList.add('animate');
    setTimeout(() => {
      document.getElementById('copyButton').classList.remove('animate');
    }, 1000); // Remove the class after 1 second
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>

      {
        <div>
          <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} py-6 flex flex-col justify-center sm:py-12`}>
            <ThemeToggleButton />
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
              <div className={`relative px-4 py-10 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'} mx-8 md:mx-0 shadow rounded-3xl sm:p-10`}>
                <div className="max-w-md mx-auto">
                  <div className="flex items-center space-x-5 mb-4"> {/* Added margin-bottom */}
                    <div className={`block pl-2 font-semibold text-xl self-start ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                      <h2 className="leading-relaxed">Ecrire un nombre en lettres</h2>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} font-normal leading-relaxed`}>Convertir des chiffres en lettres en Dirhams Marocains.</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row justify-between items-baseline">
                      <input
                        type="text"
                        placeholder='E.g. 1234,56 or 1.234,56'
                        className={`w-full sm:flex-grow mr-2 px-5 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-700'} rounded-lg outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-indigo-400' : 'focus:ring-indigo-500'} mb-4 sm:mb-0`}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <button
                        id="convertButton"
                        onClick={convertToWords}
                        className="mt-4 sm:mt-0 w-full sm:w-auto px-5 py-3 text-white rounded-lg bg-indigo-500 hover:bg-indigo-600"
                      >
                        Convertir
                      </button>
                    </div>
                    <div className={`border-0 py-5 text-base leading-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} sm:text-lg sm:leading-7 overflow-auto`} style={{ maxHeight: '200px' }}>
                      <p>{result}</p>
                      {showCopyButton && (
                        <button id="copyButton" onClick={copyToClipboard} className="mt-2 px-5 py-3 text-white rounded-lg bg-indigo-500 hover:bg-indigo-600">
                          <FontAwesomeIcon icon={faCopy} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className={`text-left text-xs ${theme === 'dark' ? 'bg-gray-800 text-gray-500' : 'bg-white text-gray-700'}`}>            
          <div className="px-5 py-3">
              <h1 className="text-2xl font-bold mb-4">Convertir des chiffres en lettres en Dirhams Marocains</h1>
              <p className="mb-4">Bienvenue sur notre convertisseur de chiffres en lettres pour les Dirhams Marocains. Cet outil vous permet de convertir n'importe quel nombre en son équivalent en lettres dans le contexte de la monnaie marocaine. Il est parfait pour rédiger des chèques, des factures ou tout autre document où vous devez écrire des montants en lettres.</p>
              <p className="mb-4">Pour utiliser cet outil, il suffit d'entrer le montant que vous souhaitez convertir dans le champ de saisie ci-dessous et de cliquer sur le bouton "Convertir". Le montant en lettres sera affiché sous le bouton.</p>
              <p className="mb-4">Cet outil prend en charge les montants jusqu'à des milliards et formate correctement les mots pour refléter la manière dont les montants sont généralement écrits en Dirhams Marocains.</p>
              <h2 className="text-xl font-bold mt-6 mb-2">Pourquoi utiliser un convertisseur de chiffres en lettres ?</h2>
              <p className="mb-4">Écrire des montants en lettres peut être une tâche délicate, surtout pour des montants importants. Notre outil vous permet de le faire facilement et sans erreurs. Il est particulièrement utile pour rédiger des chèques ou des factures, où les erreurs peuvent avoir des conséquences importantes.</p>
              <h2 className="text-xl font-bold mt-6 mb-2">Comment ça marche ?</h2>
              <p className="mb-4">Notre outil utilise un algorithme avancé pour convertir les chiffres en lettres. Il prend en compte les particularités de la langue française et de la monnaie marocaine pour fournir une conversion précise et correcte.</p>
              <p>Created by <a href="https://www.linkedin.com/in/aymen-samoudi/" className="text-indigo-500 hover:text-indigo-600">Aymen samoudi</a></p>
            </div>
          </footer>
        </div>
      }
    </ThemeContext.Provider >
  );
};

export default App;
