'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [selectedNumbers, setSelectedNumbers] = useState(new Set());
  const [lastSelected, setLastSelected] = useState(null);
  const [lastNumbers, setLastNumbers] = useState([]);
  const [gameId, setGameId] = useState(null);
  const [selectionHistory, setSelectionHistory] = useState([]);
  const [linePrize, setLinePrize] = useState('');
  const [bingoPrize, setBingoPrize] = useState('');
  const [lineClaimed, setLineClaimed] = useState(false);
  const [bingoClaimed, setBingoClaimed] = useState(false);
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [linePrizeInput, setLinePrizeInput] = useState('');
  const [bingoPrizeInput, setBingoPrizeInput] = useState('');
  const [showLineModal, setShowLineModal] = useState(false);
  const [showBingoModal, setShowBingoModal] = useState(false);

  // Cargar partida existente al montar el componente
  useEffect(() => {
    const savedGame = localStorage.getItem('bingoGame');
    if (savedGame) {
      try {
        const gameData = JSON.parse(savedGame);
        setSelectedNumbers(new Set(gameData.selectedNumbers));
        setLastSelected(gameData.lastSelected);
        setLastNumbers(gameData.lastNumbers || []);
        setGameId(gameData.gameId);
        setSelectionHistory(gameData.selectionHistory || []);
        setLinePrize(gameData.linePrize || '');
        setBingoPrize(gameData.bingoPrize || '');
        setLineClaimed(gameData.lineClaimed || false);
        setBingoClaimed(gameData.bingoClaimed || false);
      } catch (error) {
        console.error('Error al cargar partida guardada:', error);
        startNewGame();
        setShowPrizeModal(true);
      }
    } else {
      startNewGame();
      setShowPrizeModal(true);
    }
  }, []);

  const startNewGame = () => {
    const newGameId = Date.now().toString();
    setGameId(newGameId);
    setSelectedNumbers(new Set());
    setLastSelected(null);
    setLastNumbers([]);
    setSelectionHistory([]);
    setLinePrize('');
    setBingoPrize('');
    setLineClaimed(false);
    setBingoClaimed(false);
  };

  const saveGame = (selectedNumbers, lastSelected, lastNumbers, selectionHistory, linePrize, bingoPrize, lineClaimed, bingoClaimed) => {
    const gameData = {
      gameId,
      selectedNumbers: Array.from(selectedNumbers),
      lastSelected,
      lastNumbers,
      selectionHistory,
      linePrize,
      bingoPrize,
      lineClaimed,
      bingoClaimed,
      timestamp: Date.now()
    };
    localStorage.setItem('bingoGame', JSON.stringify(gameData));
  };

  const updateLastNumbers = (history) => {
    // Obtener los últimos 5 números del historial que aún están seleccionados
    const selectedFromHistory = history.filter(num => selectedNumbers.has(num));
    // Retornar en orden inverso para que el más reciente esté a la izquierda
    return selectedFromHistory.slice(-5).reverse();
  };

  const handleNumberClick = (number) => {
    const newSelectedNumbers = new Set(selectedNumbers);
    let newLastSelected = lastSelected;
    let newSelectionHistory = [...selectionHistory];
    
    if (newSelectedNumbers.has(number)) {
      // Desmarcar número
      newSelectedNumbers.delete(number);
      
      // Eliminar completamente del historial
      newSelectionHistory = newSelectionHistory.filter(n => n !== number);
      
      // Si el número desmarcado era el último seleccionado, mostrar el anterior
      if (lastSelected === number) {
        const remainingSelected = Array.from(newSelectedNumbers);
        newLastSelected = remainingSelected.length > 0 ? remainingSelected[remainingSelected.length - 1] : null;
      }
    } else {
      // Marcar número
      newSelectedNumbers.add(number);
      newLastSelected = number;
      
      // Agregar al historial
      newSelectionHistory.push(number);
    }
    
    // Actualizar la lista de últimos números basada en el historial
    const newLastNumbers = updateLastNumbers(newSelectionHistory);
    
    setSelectedNumbers(newSelectedNumbers);
    setLastSelected(newLastSelected);
    setLastNumbers(newLastNumbers);
    setSelectionHistory(newSelectionHistory);
    
    // Guardar en localStorage
    saveGame(newSelectedNumbers, newLastSelected, newLastNumbers, newSelectionHistory, linePrize, bingoPrize, lineClaimed, bingoClaimed);
  };

  const handleResetClick = () => {
    setShowPrizeModal(true);
    setLinePrizeInput('');
    setBingoPrizeInput('');
  };

  const handlePrizeSubmit = () => {
    if (linePrizeInput.trim() && bingoPrizeInput.trim()) {
      const newLinePrize = linePrizeInput.trim();
      const newBingoPrize = bingoPrizeInput.trim();
      
      startNewGame();
      setLinePrize(newLinePrize);
      setBingoPrize(newBingoPrize);
      localStorage.removeItem('bingoGame');
      setShowPrizeModal(false);
      setLinePrizeInput('');
      setBingoPrizeInput('');
    }
  };

  const handlePrizeCancel = () => {
    setShowPrizeModal(false);
    setLinePrizeInput('');
    setBingoPrizeInput('');
  };

  const handleLineClick = () => {
    setShowLineModal(true);
    const newLineClaimed = !lineClaimed;
    setLineClaimed(newLineClaimed);
    // Guardar el estado actualizado
    saveGame(selectedNumbers, lastSelected, lastNumbers, selectionHistory, linePrize, bingoPrize, newLineClaimed, bingoClaimed);
  };

  const handleBingoClick = () => {
    setShowBingoModal(true);
    const newBingoClaimed = !bingoClaimed;
    setBingoClaimed(newBingoClaimed);
    // Guardar el estado actualizado
    saveGame(selectedNumbers, lastSelected, lastNumbers, selectionHistory, linePrize, bingoPrize, lineClaimed, newBingoClaimed);
  };

  const closeLineModal = () => {
    setShowLineModal(false);
  };

  const closeBingoModal = () => {
    setShowBingoModal(false);
  };

  // Crear array de números del 1 al 100
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div className="h-screen bg-gray-100 p-4 overflow-hidden">
      <main className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="flex items-center justify-center mb-4 text-gray-800 flex-shrink-0">
          <Image
            src="/bingo-batallon-1/logo.png"
            alt="Logo Batallón 1 Exploradores Salesianos"
            width={60}
            height={60}
            className="rounded-full mr-3"
          />
          <h1 className="text-2xl font-bold">
            Bingo Batallón 1
          </h1>
        </div>
        
        <div className="flex gap-6 flex-1 min-h-0">
          {/* Grilla de números - 2/3 de la pantalla */}
          <div className="flex-2 min-h-0">
            <div className="grid grid-cols-10 gap-2 bg-white p-4 rounded-lg shadow-lg h-full overflow-auto">
              {numbers.map((number) => (
                <button
                  key={number}
                  onClick={() => handleNumberClick(number)}
                  className={`
                    aspect-square w-17 rounded-lg font-bold text-3xl transition-all duration-200
                    ${selectedNumbers.has(number)
                      ? 'bg-[#FF0D36] text-white shadow-lg transform scale-105'
                      : 'bg-blue-100 hover:bg-blue-200 text-blue-800 hover:scale-105'
                    }
                  `}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>

          {/* Panel lateral - 1/3 de la pantalla */}
          <div className="flex-1 w-80 bg-white rounded-lg shadow-lg p-4 flex flex-col min-h-0">
            <div className="text-center flex-1 flex flex-col min-h-0">
              {/* Mostrar premios en el panel lateral */}
              {linePrize && (
                <div className={`${lineClaimed ? 'opacity-50' : ''} bg-[#2F1F6F] text-white px-4 py-3 rounded-lg shadow-lg mb-3 flex-shrink-0`}>
                  <h2 className={`text-xl font-bold text-center ${lineClaimed ? 'line-through' : ''}`}>
                    Premio LÍNEA: {linePrize}
                  </h2>
                  {lineClaimed && (
                    <p className="text-sm text-center mt-1 opacity-75">
                      ¡Reclamado!
                    </p>
                  )}
                </div>
              )}

              {bingoPrize && (
                <div className={`${bingoClaimed ? 'opacity-50' : ''} bg-[#FF0D36] text-white px-4 py-3 rounded-lg shadow-lg mb-4 flex-shrink-0`}>
                  <h2 className={`text-xl font-bold text-center ${bingoClaimed ? 'line-through' : ''}`}>
                    Premio BINGO: {bingoPrize}
                  </h2>
                  {bingoClaimed && (
                    <p className="text-sm text-center mt-1 opacity-75">
                      ¡Reclamado!
                    </p>
                  )}
                </div>
              )}

              <h2 className="text-lg font-semibold mb-3 text-gray-700 flex-shrink-0">
                Número Seleccionado
              </h2>
              
              {lastSelected ? (
                <div className="mb-4 flex-1 flex flex-col min-h-0">
                  <div className="text-[18rem] font-bold text-[#FF0D36] mb-3 leading-none flex-1 flex items-center justify-center">
                    {lastSelected}
                  </div>
                  <p className="text-gray-600 mb-3 flex-shrink-0">
                    Números marcados: {selectedNumbers.size}
                  </p>
                  
                  {/* Últimos 5 números */}
                  <div className="mt-4 flex-shrink-0">
                    <h3 className="text-base font-semibold mb-2 text-gray-700">
                      Últimos números:
                    </h3>
                    <div className="flex justify-center gap-2">
                      {lastNumbers.map((num, index) => (
                        <div
                          key={index}
                          className={`
                            aspect-square w-17 rounded-lg font-bold text-3xl flex items-center justify-center transition-all duration-200
                            ${index === 0 
                              ? 'bg-[#2F1F6F] text-white shadow-lg transform scale-105' 
                              : 'bg-blue-100 text-blue-800'
                            }
                          `}
                        >
                          {num}
                        </div>
                      ))}
                      {/* Rellenar espacios vacíos */}
                      {Array.from({ length: 5 - lastNumbers.length }, (_, index) => (
                        <div
                          key={`empty-${index}`}
                          className="aspect-square w-17 bg-gray-200 text-gray-400 rounded-lg flex items-center justify-center font-bold text-3xl"
                        >
                          -
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-4 flex-1 flex flex-col min-h-0">
                  <div className="text-[18rem] font-bold text-gray-300 mb-3 leading-none flex-1 flex items-center justify-center">
                    -
                  </div>
                  <p className="text-gray-600 flex-shrink-0">
                    Selecciona un número
                  </p>
                </div>
              )}

              <button
                onClick={handleResetClick}
                className="w-full bg-[#FF0D36] hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex-shrink-0"
              >
                Reiniciar Juego
              </button>

              <div className="flex gap-2 mt-2 flex-shrink-0">
                <button
                  onClick={handleLineClick}
                  className={`flex-1 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg ${
                    lineClaimed 
                      ? 'bg-gray-400 opacity-50' 
                      : 'bg-[#2F1F6F] hover:bg-opacity-80'
                  }`}
                >
                  LÍNEA
                </button>
                <button
                  onClick={handleBingoClick}
                  className={`flex-1 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg ${
                    bingoClaimed 
                      ? 'bg-gray-400 opacity-50' 
                      : 'bg-[#FF0D36] hover:bg-opacity-80'
                  }`}
                >
                  BINGO
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal para ingresar premios */}
        {showPrizeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Nuevos Premios
              </h3>
              <p className="text-gray-600 mb-4">
                Ingresa los premios para la siguiente partida:
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Premio LÍNEA:
                </label>
                <input
                  type="text"
                  value={linePrizeInput}
                  onChange={(e) => setLinePrizeInput(e.target.value)}
                  placeholder="Ej: $500, Cena, etc."
                  className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#2F1F6F]"
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      document.getElementById('bingo-prize-input').focus();
                    }
                  }}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Premio BINGO:
                </label>
                <input
                  id="bingo-prize-input"
                  type="text"
                  value={bingoPrizeInput}
                  onChange={(e) => setBingoPrizeInput(e.target.value)}
                  placeholder="Ej: $1000, Viaje, etc."
                  className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#FF0D36]"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handlePrizeSubmit();
                    }
                  }}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handlePrizeSubmit}
                  className="flex-1 bg-[#2F1F6F] hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Confirmar
                </button>
                <button
                  onClick={handlePrizeCancel}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal LÍNEA a pantalla completa */}
        {showLineModal && (
          <div className="fixed inset-0 bg-[#2F1F6F] flex items-center justify-center z-50" onClick={closeLineModal}>
            <div className="text-center">
              <h1 className="text-[20rem] font-bold text-white leading-none">
                LÍNEA
              </h1>
              <p className="w-full text-center text-white text-md absolute bottom-20 left-0">
                ¡Toca la pantalla para cerrar!
              </p>
            </div>
          </div>
        )}

        {/* Modal BINGO a pantalla completa */}
        {showBingoModal && (
          <div className="fixed inset-0 bg-[#FF0D36] flex items-center justify-center z-50" onClick={closeBingoModal}>
            <div className="text-center">
              <h1 className="text-[20rem] font-bold text-white leading-none">
                BINGO
              </h1>
              <p className="w-full text-center text-white text-md absolute bottom-20 left-0">
                ¡Toca la pantalla para cerrar!
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
