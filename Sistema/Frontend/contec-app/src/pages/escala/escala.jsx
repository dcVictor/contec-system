import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
    Box, Button, Stack, Typography, Paper, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Chip, Drawer,
    FormControl, InputLabel, Select, MenuItem, Grid, Divider, Alert,
    Menu, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText,
    TextField, InputAdornment, Checkbox, ListItemIcon
} from "@mui/material";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import DownloadIcon from '@mui/icons-material/Download';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import GridOnIcon from '@mui/icons-material/GridOnOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleIcon from '@mui/icons-material/People'; 
import GroupOffIcon from '@mui/icons-material/GroupOff'; 
import StarIcon from '@mui/icons-material/Star'; 

// --- CONFIGURAÇÃO DOS DADOS ---
const MIP_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 25, 24, 23, 14, 15, 16, 17, 21, 22, 20, 18, 19];
const TIME_SLOTS = ["05:20", "08:20", "09:30", "10:40", "11:50", "12:50"];
const CRITICAL_MIPS = [19, 18, 20, 22, 16, 1];

// Mapeamento dos nomes para o status isPriority (Operadores Críticos)
const PRIORITY_NAMES_MAP = new Set([
    "Heidermar", "Jenifer", "Ana Flávia", "Marcia T", 
    "Marcia B", "Ilenir", "Sandra", "Salete", "Jean C"
]);

// Lista de nomes para iniciar DESATIVADOS
const INACTIVE_AT_START = new Set(["Gregorio", "Victoria", "Danyelis"]);

// --- SIMULAÇÃO DO BANCO DE DADOS ATUALIZADA ---
const OPERATORS_DB_INITIAL = [
    { id: 1, name: "Jussara", breakTime: "08:20", isActive: !INACTIVE_AT_START.has("Jussara"), isPriority: PRIORITY_NAMES_MAP.has("Jussara") }, 
    { id: 2, name: "Cauana", breakTime: "08:20", isActive: !INACTIVE_AT_START.has("Cauana"), isPriority: PRIORITY_NAMES_MAP.has("Cauana") },
    { id: 3, name: "Janaina", breakTime: "08:20", isActive: !INACTIVE_AT_START.has("Janaina"), isPriority: PRIORITY_NAMES_MAP.has("Janaina") }, 
    { id: 4, name: "Solgelys", breakTime: "08:20", isActive: !INACTIVE_AT_START.has("Solgelys"), isPriority: PRIORITY_NAMES_MAP.has("Solgelys") },
    { id: 5, name: "Isabel", breakTime: "08:20", isActive: !INACTIVE_AT_START.has("Isabel"), isPriority: PRIORITY_NAMES_MAP.has("Isabel") }, 
    { id: 31, name: "Brayan", breakTime: "08:20", isActive: !INACTIVE_AT_START.has("Brayan"), isPriority: PRIORITY_NAMES_MAP.has("Brayan") },
    { id: 33, name: "Josué", breakTime: "08:20", isActive: !INACTIVE_AT_START.has("Josué"), isPriority: PRIORITY_NAMES_MAP.has("Josué") }, 
    { id: 34, name: "Roberto", breakTime: "08:20", isActive: !INACTIVE_AT_START.has("Roberto"), isPriority: PRIORITY_NAMES_MAP.has("Roberto") },
    { id: 35, name: "Jesus", breakTime: "08:20", isActive: !INACTIVE_AT_START.has("Jesus"), isPriority: PRIORITY_NAMES_MAP.has("Jesus") },
    { id: 6, name: "Ana Flávia", breakTime: "09:30", isActive: !INACTIVE_AT_START.has("Ana Flávia"), isPriority: PRIORITY_NAMES_MAP.has("Ana Flávia") }, 
    { id: 7, name: "Heidermar", breakTime: "09:30", isActive: !INACTIVE_AT_START.has("Heidermar"), isPriority: PRIORITY_NAMES_MAP.has("Heidermar") },
    { id: 8, name: "Victoria", breakTime: "09:30", isActive: !INACTIVE_AT_START.has("Victoria"), isPriority: PRIORITY_NAMES_MAP.has("Victoria") }, // **MUDANÇA AQUI**
    { id: 9, name: "Simone", breakTime: "09:30", isActive: !INACTIVE_AT_START.has("Simone"), isPriority: PRIORITY_NAMES_MAP.has("Simone") },
    { id: 10, name: "Ilenir", breakTime: "09:30", isActive: !INACTIVE_AT_START.has("Ilenir"), isPriority: PRIORITY_NAMES_MAP.has("Ilenir") }, 
    { id: 32, name: "Salete", breakTime: "09:30", isActive: !INACTIVE_AT_START.has("Salete"), isPriority: PRIORITY_NAMES_MAP.has("Salete") },
    { id: 37, name: "Larissa", breakTime: "09:30", isActive: !INACTIVE_AT_START.has("Larissa"), isPriority: PRIORITY_NAMES_MAP.has("Larissa") }, 
    { id: 38, name: "Danyelis", breakTime: "09:30", isActive: !INACTIVE_AT_START.has("Danyelis"), isPriority: PRIORITY_NAMES_MAP.has("Danyelis") }, // **MUDANÇA AQUI**
    { id: 39, name: "Marcia B", breakTime: "09:30", isActive: !INACTIVE_AT_START.has("Marcia B"), isPriority: PRIORITY_NAMES_MAP.has("Marcia B") }, 
    { id: 40, name: "Gabriel", breakTime: "09:30", isActive: !INACTIVE_AT_START.has("Gabriel"), isPriority: PRIORITY_NAMES_MAP.has("Gabriel") },
    { id: 11, name: "Ana Garcia", breakTime: "10:40", isActive: !INACTIVE_AT_START.has("Ana Garcia"), isPriority: PRIORITY_NAMES_MAP.has("Ana Garcia") }, 
    { id: 12, name: "Jenifer", breakTime: "10:40", isActive: !INACTIVE_AT_START.has("Jenifer"), isPriority: PRIORITY_NAMES_MAP.has("Jenifer") },
    { id: 13, name: "Mariangel", breakTime: "10:40", isActive: !INACTIVE_AT_START.has("Mariangel"), isPriority: PRIORITY_NAMES_MAP.has("Mariangel") }, 
    { id: 14, name: "Jean C", breakTime: "10:40", isActive: !INACTIVE_AT_START.has("Jean C"), isPriority: PRIORITY_NAMES_MAP.has("Jean C") },
    { id: 15, name: "Emelis", breakTime: "10:40", isActive: !INACTIVE_AT_START.has("Emelis"), isPriority: PRIORITY_NAMES_MAP.has("Emelis") }, 
    { id: 41, name: "Kidia", breakTime: "10:40", isActive: !INACTIVE_AT_START.has("Kidia"), isPriority: PRIORITY_NAMES_MAP.has("Kidia") },
    { id: 42, name: "Marcia T", breakTime: "10:40", isActive: !INACTIVE_AT_START.has("Marcia T"), isPriority: PRIORITY_NAMES_MAP.has("Marcia T") }, 
    { id: 43, name: "Jean Pierre", breakTime: "10:40", isActive: !INACTIVE_AT_START.has("Jean Pierre"), isPriority: PRIORITY_NAMES_MAP.has("Jean Pierre") },
    { id: 16, name: "Freddy", breakTime: "11:50", isActive: !INACTIVE_AT_START.has("Freddy"), isPriority: PRIORITY_NAMES_MAP.has("Freddy") }, 
    { id: 17, name: "Sandra", breakTime: "11:50", isActive: !INACTIVE_AT_START.has("Sandra"), isPriority: PRIORITY_NAMES_MAP.has("Sandra") },
    { id: 18, name: "Diana", breakTime: "11:50", isActive: !INACTIVE_AT_START.has("Diana"), isPriority: PRIORITY_NAMES_MAP.has("Diana") }, 
    { id: 19, name: "Gregorio", breakTime: "11:50", isActive: !INACTIVE_AT_START.has("Gregorio"), isPriority: PRIORITY_NAMES_MAP.has("Gregorio") }, // **MUDANÇA AQUI**
    { id: 20, name: "Augusto", breakTime: "11:50", isActive: !INACTIVE_AT_START.has("Augusto"), isPriority: PRIORITY_NAMES_MAP.has("Augusto") }, 
    { id: 36, name: "Freidimar", breakTime: "11:50", isActive: !INACTIVE_AT_START.has("Freidimar"), isPriority: PRIORITY_NAMES_MAP.has("Freidimar") }
];

function Escala() {
    const [displayMatrix, setDisplayMatrix] = useState([]);
    const [db, setDb] = useState(OPERATORS_DB_INITIAL);
    const [showConfig, setShowConfig] = useState(false);
    const [configError, setConfigError] = useState("");
    
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCell, setSelectedCell] = useState({ rowIndex: null, colIndex: null });
    const [openSwapDialog, setOpenSwapDialog] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [isFillMode, setIsFillMode] = useState(false);
    const [pendingSelection, setPendingSelection] = useState([]);

    const [openMultiMIPWarning, setOpenMultiMIPWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const [confirmAction, setConfirmAction] = useState(() => () => {});

    const [openManageOperators, setOpenManageOperators] = useState(false);
    const [tempOperatorData, setTempOperatorData] = useState([]);
    
    // --- ESTADOS DE SOBRA/STANDBY ---
    const [standbyOperatorsList, setStandbyOperatorsList] = useState([]);
    const [openStandbyDrawer, setOpenStandbyDrawer] = useState(false);

    const openMenu = Boolean(anchorEl);

    const [machineConfigs, setMachineConfigs] = useState(() => {
        const initialConfig = {};
        MIP_IDS.forEach(id => initialConfig[id] = 1);
        return initialConfig;
    });

    useEffect(() => { 
        setTempOperatorData([...db]);
        // Garante que a lista de sobrando é calculada na primeira renderização se a matriz estiver preenchida.
        if (displayMatrix.length > 0) {
            syncStandbyList(displayMatrix, db);
        } else {
             // Se a tabela estiver vazia, todos os ativos são considerados "sobrando"
             setStandbyOperatorsList(db.filter(op => op.isActive).map(op => op.name).sort());
        }
    }, [db]); // eslint-disable-line react-hooks/exhaustive-deps


    // --- NOVA FUNÇÃO DE SINCRONIZAÇÃO DA LISTA DE SOBRANDO ---
    const syncStandbyList = (matrix, currentDb) => {
        if (matrix.length === 0) {
            // Se a matriz estiver vazia, todos os ativos estão sobrando.
            setStandbyOperatorsList(currentDb.filter(op => op.isActive).map(op => op.name).sort());
            return;
        }

        const activeOperators = new Set(currentDb.filter(op => op.isActive).map(op => op.name));
        const standbyList = [];
        
        // A lista de sobrando é determinada apenas pelos operadores que não foram escalados no slot 05:20
        const firstSlotColumnIndex = 0;
        const allocatedInFirstSlot = new Set();
        matrix.forEach(row => {
            const cellValue = row[firstSlotColumnIndex];
            if (cellValue && cellValue !== "N/A" && cellValue !== "") {
                cellValue.split(" / ").forEach(name => {
                    allocatedInFirstSlot.add(name);
                });
            }
        });

        // Os operadores de Standby são todos os ATIVOS que NÃO estão alocados no slot 05:20
        activeOperators.forEach(name => {
            if (!allocatedInFirstSlot.has(name)) {
                standbyList.push(name);
            }
        });

        setStandbyOperatorsList(standbyList.sort());
    };
    // -------------------------------------------------------------------------


    const handleConfigChange = (mipId, value) => {
        setMachineConfigs(prev => ({ ...prev, [mipId]: parseFloat(value) }));
    };

    const handleOpenBlankTable = () => {
        const blankMatrix = MIP_IDS.map(mipId => {
            const config = machineConfigs[mipId];
            if (config === 0) {
                return Array(TIME_SLOTS.length).fill("N/A");
            }
            return Array(TIME_SLOTS.length).fill("");
        });
        setDisplayMatrix(blankMatrix);
        setShowConfig(false);
        syncStandbyList(blankMatrix, db); // Todos os ativos vão para a lista de sobrando
    };

    const handleCellClick = (event, rowIndex, colIndex, cellValue) => {
        if (cellValue !== "N/A") {
            setAnchorEl(event.currentTarget);
            setSelectedCell({ rowIndex, colIndex });
        }
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    // --- FUNÇÕES DE LIMPEZA ATUALIZADAS PARA SINCRONIZAÇÃO ---

    const handleDeleteOperator = () => {
        const { rowIndex, colIndex } = selectedCell;
        if (rowIndex !== null && colIndex !== null) {
            const newMatrix = [...displayMatrix.map(row => [...row])];
            newMatrix[rowIndex][colIndex] = ""; 
            setDisplayMatrix(newMatrix);
            
            // Sincroniza a lista de sobrando
            syncStandbyList(newMatrix, db); 
        }
        setAnchorEl(null);
        setSelectedCell({ rowIndex: null, colIndex: null });
    };

    const handleClearUntilEnd = () => {
        const { rowIndex, colIndex } = selectedCell;
        if (rowIndex !== null && colIndex !== null) {
            const newMatrix = [...displayMatrix.map(row => [...row])];
            for (let i = colIndex; i < TIME_SLOTS.length; i++) {
                if (newMatrix[rowIndex][i] !== "N/A") {
                    newMatrix[rowIndex][i] = "";
                }
            }
            setDisplayMatrix(newMatrix);
            
            // Sincroniza a lista de sobrando
            syncStandbyList(newMatrix, db);
        }
        setAnchorEl(null);
        setSelectedCell({ rowIndex: null, colIndex: null });
    };

    const handleDeleteFromAll = () => {
        const { rowIndex, colIndex } = selectedCell;
        if (rowIndex !== null && colIndex !== null) {
            const operatorName = displayMatrix[rowIndex][colIndex]; 
            if (!operatorName) return;
            const newMatrix = displayMatrix.map(row => 
                row.map(cellValue => cellValue === operatorName ? "" : cellValue)
            );
            setDisplayMatrix(newMatrix);
            
            // Sincroniza a lista de sobrando
            syncStandbyList(newMatrix, db);
        }
        setAnchorEl(null);
        setSelectedCell({ rowIndex: null, colIndex: null });
    };

    // --- FIM DAS FUNÇÕES DE LIMPEZA ATUALIZADAS ---


    const handleOpenSwapDialog = (fillToEnd = false) => {
        const { rowIndex, colIndex } = selectedCell;
        let currentOperators = [];
        if (rowIndex !== null && colIndex !== null) {
            const cellValue = displayMatrix[rowIndex][colIndex];
            if (cellValue && cellValue !== "" && cellValue !== "N/A") {
                currentOperators = cellValue.split(" / ");
            }
        }
        setPendingSelection(currentOperators); 
        setAnchorEl(null);
        setSearchTerm(""); 
        setIsFillMode(fillToEnd);
        setOpenSwapDialog(true);
    };

    const toggleOperatorInSelection = (operatorName) => {
        setPendingSelection(prev => {
            if (prev.includes(operatorName)) {
                return prev.filter(name => name !== operatorName); 
            } else {
                return [...prev, operatorName]; 
            }
        });
    };

    // --- FUNÇÃO DE VERIFICAÇÃO SIMULTÂNEA (ALOCAÇÃO POR HORÁRIO) (inalterada) ---
    const checkMultipleMIPs = (operatorNames, currentRowIndex, currentColIndex) => {
        let warnings = [];
        const simultaneousAllocations = {}; 
        
        displayMatrix.forEach((row, rIdx) => {
            const cellValue = row[currentColIndex]; 

            if (cellValue && cellValue !== "" && cellValue !== "N/A") {
                const namesInCell = cellValue.split(" / ");
                namesInCell.forEach(name => {
                    if (operatorNames.includes(name)) { 
                        if (!simultaneousAllocations[name]) {
                            simultaneousAllocations[name] = new Set();
                        }
                        simultaneousAllocations[name].add(MIP_IDS[rIdx]);
                    }
                });
            }
        });

        operatorNames.forEach(name => {
            const currentMIP = MIP_IDS[currentRowIndex];
            
            let allocatedMIPs = new Set(simultaneousAllocations[name] || []);
            allocatedMIPs.add(currentMIP);
            
            const totalAllocations = allocatedMIPs.size;
            
            if (totalAllocations > 2) {
                const mipList = Array.from(allocatedMIPs).sort((a, b) => a - b).join(', ');
                warnings.push(`O operador **${name}** já está alocado em **${totalAllocations - 1}** outras MIPs neste horário. (Total: ${mipList}).`);
            }
        });

        const hasWarning = warnings.length > 0;
        
        return {
            hasWarning: hasWarning,
            warningMsg: hasWarning ? `**ALERTA DE ALOCAÇÃO EXCESSIVA SIMULTÂNEA**\n\n${warnings.join('\n')}\n\nO(s) operador(es) será(ão) alocado(s) em mais de duas MIPs **no mesmo horário (${TIME_SLOTS[currentColIndex]})**. Tem certeza que deseja alocar?` : null
        };
    };

    // --- FUNÇÃO DE SALVAR SWAP ATUALIZADA PARA SINCRONIZAÇÃO ---
    const handleSaveSwap = () => {
        const { rowIndex, colIndex } = selectedCell;
        if (rowIndex === null || colIndex === null) return;
        
        const newCellValue = pendingSelection.join(" / ");
        
        const { hasWarning, warningMsg } = checkMultipleMIPs(pendingSelection, rowIndex, colIndex);

        const executeSave = () => {
            const newMatrix = [...displayMatrix.map(row => [...row])];
            
            if (isFillMode) {
                for (let i = colIndex; i < TIME_SLOTS.length; i++) {
                    if (newMatrix[rowIndex][i] !== "N/A") {
                        newMatrix[rowIndex][i] = newCellValue;
                    }
                }
            } else {
                newMatrix[rowIndex][colIndex] = newCellValue;
            }

            setDisplayMatrix(newMatrix);
            // Sincroniza a lista de sobrando após a alteração manual
            syncStandbyList(newMatrix, db); 
            
            setOpenMultiMIPWarning(false); 
            setSelectedCell({ rowIndex: null, colIndex: null });
        };

        if (hasWarning) {
            setWarningMessage(warningMsg);
            setConfirmAction(() => executeSave); 
            setOpenSwapDialog(false); 
            setOpenMultiMIPWarning(true); 
        } else {
            executeSave();
            setOpenSwapDialog(false);
        }
    };
    // --- FIM DA FUNÇÃO DE SALVAR SWAP ATUALIZADA ---

    const isSelectedCellEmpty = () => {
        const { rowIndex, colIndex } = selectedCell;
        if (rowIndex === null || colIndex === null || !displayMatrix[rowIndex]) return true;
        
        const val = displayMatrix[rowIndex][colIndex];
        return !val || val === "";
    };


    const shuffleArray = (array) => {
        let currentIndex = array.length, randomIndex;
        let newArray = [...array];
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
        }
        return newArray;
    };

    const generateSchedule = () => {
        const regularOperators = db.filter(op => op.isActive); 
        if (regularOperators.length === 0) { alert("Nenhum operador ativo para gerar a escala."); return; }

        const halfCount = Object.values(machineConfigs).filter(v => v === 0.5).length;
        setConfigError(halfCount % 2 !== 0 ? "Atenção: Número ímpar de máquinas '1/2'." : "");

        const slotMapping = {};
        let currentSlotIndex = 0;
        const halfMips = [];
        MIP_IDS.forEach(mipId => {
            const req = machineConfigs[mipId];
            slotMapping[mipId] = [];
            if (req >= 1) {
                for (let i = 0; i < req; i++) { 
                    slotMapping[mipId].push(currentSlotIndex); 
                    currentSlotIndex++; 
                }
            } else if (req === 0.5) { 
                halfMips.push(mipId); 
            }
        });
        
        for (let i = 0; i < halfMips.length; i += 2) {
            const mip1 = halfMips[i]; const mip2 = halfMips[i + 1];
            slotMapping[mip1].push(currentSlotIndex);
            if (mip2) slotMapping[mip2].push(currentSlotIndex);
            currentSlotIndex++;
        }
        const totalSlots = currentSlotIndex;
        if (totalSlots === 0) { alert("Nenhuma máquina ativa."); return; }

        let currentSlotsState = Array(totalSlots).fill(null);
        const finalMatrix = Array(MIP_IDS.length).fill(null).map(() => []);

        // --- INÍCIO DA LÓGICA DE PRIORIZAÇÃO (Slot 05:20) ---
        
        let priorityOperatorsPool = shuffleArray(regularOperators.filter(op => op.isPriority));
        let regularOperatorsPool = shuffleArray(regularOperators.filter(op => !op.isPriority));
        
        // 1. Identifica os índices dos slots alocados a MIPs Críticas
        const criticalSlotIndices = new Set();
        MIP_IDS.forEach((mipId, mipIndex) => {
            if (CRITICAL_MIPS.includes(mipId) && machineConfigs[mipId] > 0) {
                slotMapping[mipId].forEach(slotIdx => criticalSlotIndices.add(slotIdx));
            }
        });

        // 2. Preenche os slots Críticos com Operadores Prioritários
        criticalSlotIndices.forEach(slotIdx => {
            if (currentSlotsState[slotIdx] === null) {
                if (priorityOperatorsPool.length > 0) {
                    currentSlotsState[slotIdx] = priorityOperatorsPool.shift();
                }
            }
        });

        // 3. Preenche o restante dos slots com o pool restante (Prioritários não usados + Regulares)
        let initialPool = [...priorityOperatorsPool, ...regularOperatorsPool];
        
        currentSlotsState = currentSlotsState.map((slot, slotIdx) => {
            if (slot === null) {
                if (initialPool.length > 0) return initialPool.shift();
                return { name: "" }; 
            }
            return slot;
        });

        // 4. Captura os operadores que sobraram (standby)
        let standbyOperators = [...initialPool];
        
        // --- ATUALIZAÇÃO DO ESTADO DE SOBRA AQUI ---
        setStandbyOperatorsList(standbyOperators.map(op => op.name).sort());
        
        // --- FIM DA LÓGICA DE PRIORIZAÇÃO ---

        saveSlotsToMatrix(currentSlotsState, 0, finalMatrix, slotMapping);

        let operatorsOnBreak = []; 
        let leftoversPool = [];    

        for (let timeIndex = 1; timeIndex < TIME_SLOTS.length; timeIndex++) {
            const timeSlot = TIME_SLOTS[timeIndex];
            const isLastSlot = timeIndex === TIME_SLOTS.length - 1;

            let coveragePool = [...operatorsOnBreak, ...leftoversPool];
            operatorsOnBreak = []; 
            leftoversPool = [];

            if (timeSlot === "08:20") {
                coveragePool = [...coveragePool, ...standbyOperators];
                standbyOperators = []; 
            }

            currentSlotsState = currentSlotsState.map(operatorOnSlot => {
                if (operatorOnSlot && operatorOnSlot.name !== "" && operatorOnSlot.breakTime === timeSlot && !isLastSlot) {
                    operatorsOnBreak.push(operatorOnSlot);
                    return null; 
                }
                return operatorOnSlot;
            });

            coveragePool = shuffleArray(coveragePool);

            currentSlotsState = currentSlotsState.map(slot => {
                if (slot === null) {
                    const validIndex = coveragePool.findIndex(op => op.breakTime !== timeSlot);
                    if (validIndex !== -1) {
                        const [selectedOp] = coveragePool.splice(validIndex, 1);
                        return selectedOp;
                    } else {
                        return { name: "" }; 
                    }
                }
                return slot;
            });

            leftoversPool = [...coveragePool];
            saveSlotsToMatrix(currentSlotsState, timeIndex, finalMatrix, slotMapping);
        }
        
        setDisplayMatrix(finalMatrix);
        setShowConfig(false);
    };

    const saveSlotsToMatrix = (slotsState, timeIndex, finalMatrix, mapping) => {
        MIP_IDS.forEach((mipId, mipArrayIndex) => {
            const assignedSlotIndices = mapping[mipId];
            if (!assignedSlotIndices || assignedSlotIndices.length === 0) {
                 finalMatrix[mipArrayIndex][timeIndex] = "";
                 return;
            }
            const operators = assignedSlotIndices.map(slotIdx => slotsState[slotIdx]);
            const formattedName = operators.map(op => (op && op.name) ? op.name : "").join(" / ");
            finalMatrix[mipArrayIndex][timeIndex] = formattedName;
        });
    }

    const exportToExcel = () => {
        if (displayMatrix.length === 0) return;
        const excelData = [];
        excelData.push(["MIP", ...TIME_SLOTS]);
        MIP_IDS.forEach((mipId, index) => {
            const rowData = [mipId];
            if (displayMatrix[index]) { rowData.push(...displayMatrix[index]); }
            excelData.push(rowData);
        });
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(excelData);
        const wscols = [
            { wch: 4 }, 
            ...TIME_SLOTS.map(() => ({ wch: 20 }))
        ];
        ws['!cols'] = wscols;
        const range = XLSX.utils.decode_range(ws['!ref']);
        for (let R = range.s.r; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const cell_address = XLSX.utils.encode_cell({ r: R, c: C });
                if (!ws[cell_address]) continue;
                const cell = ws[cell_address];
                const cellValue = cell.v ? String(cell.v) : "";
                const numberOfOperators = cellValue.split('/').length;
                const fontSize = numberOfOperators >= 3 ? 11 : 12;
                cell.s = {
                    border: {
                        top: { style: "thin", color: { rgb: "000000" } },
                        bottom: { style: "thin", color: { rgb: "000000" } },
                        left: { style: "thin", color: { rgb: "000000" } },
                        right: { style: "thin", color: { rgb: "000000" } }
                    },
                    alignment: { 
                        vertical: "center", 
                        horizontal: "center",
                        wrapText: true 
                    },
                    font: {
                        name: "Calibri",
                        sz: fontSize,
                        bold: R === 0 
                    }
                };
            }
        }
        XLSX.utils.book_append_sheet(wb, ws, "Escala V28");
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(data, `escala_producao_v28.xlsx`);
    };

    const findOperatorData = (cellValue) => {
        if (!cellValue || cellValue === "" || cellValue === "N/A") return null;
        const firstPersonName = cellValue.split(" / ")[0];
        return db.find(op => op.name === firstPersonName); 
    };

    const filteredOperators = db
        .filter(op => op.isActive)
        .filter(op => op.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a,b) => a.name.localeCompare(b.name));

    // --- FUNÇÕES DE GERENCIAMENTO DE OPERADORES ---
    
    const updateDisplayMatrixAfterDBChange = (newDb) => {
        if (displayMatrix.length === 0) return; 

        const activeOperators = new Set(newDb.filter(op => op.isActive).map(op => op.name));
        
        const newMatrix = displayMatrix.map(row => 
            row.map(cellValue => {
                if (cellValue === "N/A" || cellValue === "") return cellValue;

                const operatorsInCell = cellValue.split(" / ");
                
                const updatedOperators = operatorsInCell.filter(name => activeOperators.has(name));
                
                if (updatedOperators.length === 0) {
                    return ""; 
                }
                
                return updatedOperators.join(" / ");
            })
        );
        setDisplayMatrix(newMatrix);
        syncStandbyList(newMatrix, newDb); 
    };
    
    const handleOpenManageOperators = () => {
        setTempOperatorData([...db]);
        setOpenManageOperators(true);
    }
    
    const handleCloseManageOperators = () => {
        setOpenManageOperators(false);
    }

    const handleSaveManageOperators = () => {
        setDb(tempOperatorData); 
        setOpenManageOperators(false);
        updateDisplayMatrixAfterDBChange(tempOperatorData); 
    }

    const handleToggleOperatorActive = (id) => {
        setTempOperatorData(prev => prev.map(op => 
            op.id === id ? { ...op, isActive: !op.isActive } : op
        ));
    }
    
    const handleTogglePriority = (id) => {
        setTempOperatorData(prev => prev.map(op => 
            op.id === id ? { ...op, isPriority: !op.isPriority } : op
        ));
    }

    const handleEditBreakTime = (id, newBreakTime) => {
         setTempOperatorData(prev => prev.map(op => 
            op.id === id ? { ...op, breakTime: newBreakTime } : op
        ));
    }
    
    // --- Renderização do Drawer (Sobrantes) ---
    const StandbyDrawer = () => (
        <Drawer
            anchor="right"
            open={openStandbyDrawer}
            onClose={() => setOpenStandbyDrawer(false)}
        >
            <Box sx={{ width: 300, p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <GroupOffIcon sx={{ mr: 1 }} /> Operadores Sobrando ({standbyOperatorsList.length})
                </Typography>
                
                <Alert severity={standbyOperatorsList.length > 0 ? "warning" : "success"} sx={{ mb: 2 }}>
                    {standbyOperatorsList.length > 0
                        ? `Estes ${standbyOperatorsList.length} operadores ativos não estão alocados no 05:20.`
                        : "Todos os operadores ativos estão alocados no slot inicial."
                    }
                </Alert>
                
                <List dense>
                    {standbyOperatorsList.map((name, index) => {
                        const op = db.find(o => o.name === name);
                        return (
                            <ListItem key={index}>
                                <ListItemText 
                                    primary={
                                        <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                                            {name}
                                            {op?.isPriority && <StarIcon fontSize="small" sx={{ color: 'gold', ml: 0.5 }} />}
                                        </Box>
                                    } 
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </Drawer>
    );

    return (
        <Paper elevation={2} sx={{ p: 3, m: 2 }}>
            <Box>
                <Button startIcon={<SettingsIcon />} onClick={() => setShowConfig(!showConfig)} sx={{ mb: 2 }}>
                    {showConfig ? "Ocultar Configuração" : "Mostrar Configuração de Máquinas"}
                </Button>

                {showConfig && (
                    <Paper variant="outlined" sx={{ p: 2, mb: 3, backgroundColor: '#f8f9fa' }}>
                         <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Configurar Crédito (Número de Operadores):</Typography>
                         {configError && <Alert severity="warning" sx={{ mb: 2 }}>{configError}</Alert>}
                        <Grid container spacing={2}>
                            {MIP_IDS.map(mipId => (
                                <Grid item xs={6} sm={4} md={3} lg={2} key={mipId}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id={`label-mip-${mipId}`}>MIP {mipId}</InputLabel>
                                        <Select 
                                            labelId={`label-mip-${mipId}`} 
                                            value={machineConfigs[mipId]} 
                                            label={`MIP ${mipId}`} 
                                            onChange={(e) => handleConfigChange(mipId, e.target.value)}
                                        >
                                            <MenuItem value={0}>Desativada</MenuItem>
                                            <MenuItem value={0.5}>1/2 Op.</MenuItem>
                                            <MenuItem value={1}>1 Op.</MenuItem>
                                            <MenuItem value={2}>2 Op.</MenuItem>
                                            <MenuItem value={3}>3 Op.</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            ))}
                        </Grid>
                         <Divider sx={{ my: 2 }} />
                    </Paper>
                )}

                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                    <Button variant="contained" color="primary" startIcon={<ShuffleIcon />} onClick={generateSchedule}>Gerar Escala</Button>
                    <Button variant="outlined" color="secondary" startIcon={<GridOnIcon />} onClick={handleOpenBlankTable}>Abrir Tabela em Branco</Button>
                    <Button variant="outlined" startIcon={<PeopleIcon />} onClick={handleOpenManageOperators}>Gerenciar Operadores</Button> 
                    
                    <Button 
                        variant="outlined" 
                        startIcon={<GroupOffIcon />} 
                        onClick={() => setOpenStandbyDrawer(true)}
                        disabled={displayMatrix.length === 0}
                        color={standbyOperatorsList.length > 0 ? "warning" : "inherit"}
                    >
                        Sobrando ({standbyOperatorsList.length})
                    </Button>
                    
                    <Button variant="outlined" startIcon={<DownloadIcon />} onClick={exportToExcel} disabled={displayMatrix.length === 0}>Baixar Escala</Button>
                </Stack>

                {displayMatrix.length > 0 && (
                    <TableContainer component={Paper} variant="outlined" sx={{maxHeight: '700px'}}>
                        <Table size="small" stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ backgroundColor: '#e0e0e0', fontWeight: 'bold', width: '10px' }}>MIP</TableCell>
                                    <TableCell align="center" sx={{ backgroundColor: '#e0e0e0', fontWeight: 'bold', width: '10px' }}>Crédito</TableCell>
                                    {TIME_SLOTS.map(slot => (<TableCell key={slot} align="center" sx={{ backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>{slot}</TableCell>))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {MIP_IDS.map((mip, rowIndex) => {
                                    const configValue = machineConfigs[mip];
                                    let configLabel = configValue === 0.5 ? '1/2' : (configValue === 0 ? 'Desativada' : configValue);
                                    
                                    const isCritical = CRITICAL_MIPS.includes(mip);

                                    return (
                                    <TableRow key={mip} hover>
                                        <TableCell component="th" scope="row" sx={{ 
                                            fontWeight: 'bold', 
                                            backgroundColor: isCritical ? '#ffe0b2' : '#f5f5f5' 
                                        }}>{mip}</TableCell>
                                        <TableCell align="center" sx={{ 
                                            backgroundColor: isCritical ? '#ffe0b2' : '#f5f5f5', 
                                            color: 'text.secondary', 
                                            fontSize: '0.8rem' 
                                        }}>{configLabel}</TableCell>
                                        {displayMatrix[rowIndex] && displayMatrix[rowIndex].map((cellValue, colIndex) => {
                                            const isNA = cellValue === 'N/A';
                                            const isEmpty = cellValue === "";
                                            const operatorData = findOperatorData(cellValue);
                                            const currentTimeSlot = TIME_SLOTS[colIndex];
                                            const isLastSlot = colIndex === TIME_SLOTS.length - 1;
                                            const isOnBreakSlot = operatorData && operatorData.breakTime === currentTimeSlot && !isLastSlot;
                                            
                                            const isPriorityOperator = operatorData && db.find(op => op.name === operatorData.name)?.isPriority;
                                            const isCriticalCell = isCritical && colIndex === 0 && isPriorityOperator;

                                            return (
                                            <TableCell key={colIndex} align="center" onClick={(event) => handleCellClick(event, rowIndex, colIndex, cellValue)}
                                                sx={{
                                                 backgroundColor: isNA ? '#e0e0e0' : (isEmpty ? '#fff' : (isOnBreakSlot ? '#fff9c4' : (isCriticalCell ? '#e8f5e9' : 'inherit'))), 
                                                 color: isNA ? 'text.disabled' : 'inherit',
                                                 cursor: (!isNA) ? 'pointer' : 'default',
                                                 '&:hover': { backgroundColor: (!isNA) ? '#f5f5f5' : undefined },
                                                 fontSize: cellValue.includes('/') ? '0.8rem' : 'inherit',
                                                 fontWeight: isCriticalCell ? 'bold' : 'normal'
                                            }}>
                                                 {isOnBreakSlot && !isNA && !isEmpty ? (
                                                     <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                                                         <span style={{whiteSpace: cellValue.includes('/') ? 'pre-wrap' : 'nowrap'}}>{cellValue.replace(' / ', '\n')}</span>
                                                         <Chip label="Pausa" size="small" color="warning" variant="outlined" sx={{height: 20, fontSize: '0.7rem'}} />
                                                     </Stack>
                                                 ) : (
                                                    <span style={{whiteSpace: 'pre-wrap'}}>{cellValue.split(' / ').join('\n')}</span>
                                                 )}
                                            </TableCell>
                                        )})}
                                    </TableRow>
                                )})}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                
                <Menu id="edit-menu" anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
                    <MenuItem onClick={() => handleOpenSwapDialog(false)} sx={{ color: 'primary.main' }}>
                        {isSelectedCellEmpty() ? ( 
                            <> <AddCircleOutlineIcon fontSize="small" sx={{ mr: 1 }} /> Adicionar / Editar </>
                        ) : (
                            <> <SwapHorizIcon fontSize="small" sx={{ mr: 1 }} /> Editar Operadores (Trocar/Adicionar) </>
                        )}
                    </MenuItem>
                    <MenuItem onClick={() => handleOpenSwapDialog(true)} sx={{ color: 'secondary.main', fontWeight: 'medium' }}>
                         <KeyboardDoubleArrowRightIcon fontSize="small" sx={{ mr: 1 }} /> Editar até o Fim
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleDeleteOperator} sx={{ color: 'text.secondary' }}>
                        <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Apagar (Esvaziar Slot)
                    </MenuItem>
                    <MenuItem onClick={handleClearUntilEnd} sx={{ color: 'error.main' }}>
                        <DeleteSweepIcon fontSize="small" sx={{ mr: 1 }} /> Esvaziar até o Fim
                    </MenuItem>
                    {!isSelectedCellEmpty() && ( 
                         <MenuItem onClick={handleDeleteFromAll} sx={{ color: 'error.dark', fontWeight: 'bold' }}>
                            <CleaningServicesIcon fontSize="small" sx={{ mr: 1 }} /> Excluir da Tabela Toda
                        </MenuItem>
                    )}
                </Menu>

                {/* DIÁLOGO DE EDIÇÃO DE SLOT */}
                <Dialog open={openSwapDialog} onClose={() => setOpenSwapDialog(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>
                        Editar Operadores no Slot
                        {isFillMode && <Typography component="span" color="secondary" variant="caption" sx={{ml: 1, fontWeight: 'bold'}}>(Até o final)</Typography>}
                    </DialogTitle>
                    
                    <Box sx={{ px: 3, pt: 1, pb: 1 }}>
                        <Typography variant="caption" color="text.secondary" gutterBottom>
                            Selecionados ({pendingSelection.length}):
                        </Typography>
                        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ minHeight: '40px', mb: 2, p: 1, border: '1px dashed #ccc', borderRadius: 1 }}>
                            {pendingSelection.length === 0 && <Typography variant="body2" color="text.disabled" sx={{fontStyle:'italic'}}>Nenhum operador selecionado (Vazio)</Typography>}
                            {pendingSelection.map(name => (
                                <Chip 
                                    key={name} 
                                    label={name} 
                                    onDelete={() => toggleOperatorInSelection(name)}
                                    color="primary" 
                                    size="small"
                                />
                            ))}
                        </Stack>

                        <TextField 
                            fullWidth 
                            size="small" 
                            placeholder="Buscar nome para adicionar..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <DialogContent dividers sx={{ maxHeight: '400px' }}>
                        <List dense>
                            {filteredOperators.map((op) => {
                                const isSelected = pendingSelection.includes(op.name);
                                return (
                                <ListItem 
                                    button 
                                    key={op.id} 
                                    onClick={() => toggleOperatorInSelection(op.name)}
                                    selected={isSelected}
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={isSelected}
                                            tabIndex={-1}
                                            disableRipple
                                            size="small"
                                        />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={
                                            <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                                                {op.name}
                                                {op.isPriority && <StarIcon fontSize="small" sx={{ color: 'gold', ml: 0.5 }} />}
                                            </Box>
                                        } 
                                        secondary={`Pausa: ${op.breakTime}`} 
                                        primaryTypographyProps={{ fontWeight: isSelected ? 'bold' : 'normal' }}
                                    />
                                </ListItem>
                            )})}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenSwapDialog(false)}>Cancelar</Button>
                        <Button 
                            onClick={handleSaveSwap} 
                            variant="contained" 
                            startIcon={<CheckCircleIcon />}
                        >
                            Confirmar Alteração
                        </Button>
                    </DialogActions>
                </Dialog>
                
                {/* DIÁLOGO DE AVISO DE MULTI-MIP */}
                <Dialog open={openMultiMIPWarning} onClose={() => setOpenMultiMIPWarning(false)} maxWidth="sm">
                    <DialogTitle sx={{ color: 'error.main', fontWeight: 'bold' }}>
                        🛑 Confirmação de Alocação
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography component="div" variant="body1">
                            <div dangerouslySetInnerHTML={{ __html: warningMessage.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </Typography>
                        <Alert severity="warning" sx={{ mt: 2 }}>
                            Alocar um operador em mais de duas máquinas **simultaneamente** pode causar problemas de cobertura na escala.
                        </Alert>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenMultiMIPWarning(false)}>
                            Cancelar (Não Salvar)
                        </Button>
                        <Button 
                            onClick={confirmAction} 
                            variant="contained" 
                            color="error"
                        >
                            Confirmar e Salvar Assim Mesmo
                        </Button>
                    </DialogActions>
                </Dialog>
                
                {/* --- DIÁLOGO DE GERENCIAMENTO DE OPERADORES --- */}
                <Dialog open={openManageOperators} onClose={handleCloseManageOperators} maxWidth="lg" fullWidth>
                    <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h6" component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                            <PeopleIcon sx={{ mr: 1 }} /> Gerenciar Operadores ({tempOperatorData.filter(op => op.isActive).length} Ativos)
                        </Typography>
                    </DialogTitle>
                    <DialogContent dividers sx={{ p: 0 }}>
                        <TableContainer sx={{ maxHeight: 500 }}>
                            <Table stickyHeader size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>Nome</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', width: '20%' }}>Crítico</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>Pausa (Break Time)</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', width: '20%' }}>Ativo/Desativado</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tempOperatorData.sort((a,b) => a.name.localeCompare(b.name)).map((op) => (
                                        <TableRow key={op.id} hover sx={{ backgroundColor: op.isActive ? (op.isPriority ? '#fff3e0' : 'inherit') : '#fce4ec' }}>
                                            <TableCell>
                                                <Typography variant="body2" sx={{ color: op.isActive ? 'inherit' : 'text.disabled', fontWeight: op.isPriority ? 'bold' : 'normal' }}>
                                                    {op.name}
                                                </Typography>
                                            </TableCell>
                                            
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={op.isPriority}
                                                    onChange={() => handleTogglePriority(op.id)}
                                                    color="warning"
                                                    icon={<StarIcon sx={{ color: 'lightgray' }} />}
                                                    checkedIcon={<StarIcon sx={{ color: 'gold' }} />}
                                                    disabled={!op.isActive}
                                                />
                                            </TableCell>
                                            
                                            <TableCell>
                                                <FormControl fullWidth size="small">
                                                    <Select
                                                        value={op.breakTime}
                                                        onChange={(e) => handleEditBreakTime(op.id, e.target.value)}
                                                        disabled={!op.isActive}
                                                        sx={{ fontSize: '0.8rem' }}
                                                    >
                                                        {TIME_SLOTS.slice(1).map(slot => (
                                                            <MenuItem key={slot} value={slot}>{slot}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={op.isActive}
                                                    onChange={() => handleToggleOperatorActive(op.id)}
                                                    color="primary"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseManageOperators}>Cancelar</Button>
                        <Button 
                            onClick={handleSaveManageOperators} 
                            variant="contained" 
                            startIcon={<CheckCircleIcon />}
                        >
                            Salvar Alterações
                        </Button>
                    </DialogActions>
                </Dialog>
                
                {/* --- Componente Drawer (Lista de Operadores Sobrando) --- */}
                <StandbyDrawer />

            </Box>
        </Paper>
    );
}

export default Escala;