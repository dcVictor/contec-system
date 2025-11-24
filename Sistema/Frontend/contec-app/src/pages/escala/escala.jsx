import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
    Box, Button, Stack, Typography, Paper, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Chip,
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
import GridOnIcon from '@mui/icons-material/GridOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// --- CONFIGURAÇÃO DOS DADOS ---
const MIP_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 25, 24, 23, 14, 15, 16, 17, 21, 22, 20, 18, 19];
const TIME_SLOTS = ["05:20", "08:20", "09:30", "10:40", "11:50", "12:50"];

// --- SIMULAÇÃO DO BANCO DE DADOS ---
const OPERATORS_DB = [
    { id: 1, name: "Jussara", breakTime: "08:20" }, { id: 2, name: "Cauana", breakTime: "08:20" },
    { id: 3, name: "Janaina", breakTime: "08:20" }, { id: 4, name: "Solgelys", breakTime: "08:20" },
    { id: 5, name: "Isabel", breakTime: "08:20" }, { id: 31, name: "Brayan", breakTime: "08:20" },
    { id: 33, name: "Josué", breakTime: "08:20" }, { id: 34, name: "Roberto", breakTime: "08:20" },
    { id: 35, name: "Jesus", breakTime: "08:20" },
    { id: 6, name: "Ana Flávia", breakTime: "09:30" }, { id: 7, name: "Heidermar", breakTime: "09:30" },
    { id: 8, name: "Victoria", breakTime: "09:30" }, { id: 9, name: "Simone", breakTime: "09:30" },
    { id: 10, name: "Ilenir", breakTime: "09:30" }, { id: 32, name: "Salete", breakTime: "09:30" },
     { id: 37, name: "Larissa", breakTime: "09:30" }, { id: 38, name: "Danyelis", breakTime: "09:30" },
    { id: 39, name: "Marcia B", breakTime: "09:30" }, { id: 40, name: "Gabriel", breakTime: "09:30" },
    { id: 11, name: "Ana Garcia", breakTime: "10:40" }, { id: 12, name: "Jenifer", breakTime: "10:40" },
    { id: 13, name: "Mariangel", breakTime: "10:40" }, { id: 14, name: "Jean C", breakTime: "10:40" },
    { id: 15, name: "Emelis", breakTime: "10:40" }, { id: 41, name: "Kidia", breakTime: "10:40" },
    { id: 42, name: "Marcia T", breakTime: "10:40" }, { id: 43, name: "Jean Pierre", breakTime: "10:40" },
    { id: 16, name: "Freddy", breakTime: "11:50" }, { id: 17, name: "Sandra", breakTime: "11:50" },
    { id: 18, name: "Diana", breakTime: "11:50" }, { id: 19, name: "Gregorio", breakTime: "11:50" },
    { id: 20, name: "Augusto", breakTime: "11:50" }, { id: 36, name: "Freidimar", breakTime: "11:50" }
];

function Escala() {
    const [displayMatrix, setDisplayMatrix] = useState([]);
    const [db, setDb] = useState([]);
    const [showConfig, setShowConfig] = useState(false);
    const [configError, setConfigError] = useState("");
    
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCell, setSelectedCell] = useState({ rowIndex: null, colIndex: null });
    const [openSwapDialog, setOpenSwapDialog] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [isFillMode, setIsFillMode] = useState(false);
    const [pendingSelection, setPendingSelection] = useState([]);

    const openMenu = Boolean(anchorEl);

    const [machineConfigs, setMachineConfigs] = useState(() => {
        const initialConfig = {};
        MIP_IDS.forEach(id => initialConfig[id] = 1);
        return initialConfig;
    });

    useEffect(() => { setDb([...OPERATORS_DB]); }, []);

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

    const handleDeleteOperator = () => {
        const { rowIndex, colIndex } = selectedCell;
        if (rowIndex !== null && colIndex !== null) {
            const newMatrix = [...displayMatrix.map(row => [...row])];
            newMatrix[rowIndex][colIndex] = ""; 
            setDisplayMatrix(newMatrix);
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
        }
        setAnchorEl(null);
        setSelectedCell({ rowIndex: null, colIndex: null });
    };

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

    const handleSaveSwap = () => {
        const { rowIndex, colIndex } = selectedCell;
        if (rowIndex !== null && colIndex !== null) {
            const newMatrix = [...displayMatrix.map(row => [...row])];
            const newCellValue = pendingSelection.join(" / ");
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
        }
        setOpenSwapDialog(false);
        setSelectedCell({ rowIndex: null, colIndex: null });
    };

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
        if (db.length === 0) { alert("Aguarde carregar dados..."); return; }

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
        const regularOperators = db.filter(op => !op.isJoker);

        let standbyOperators = []; 
        let operatorsOnBreak = []; 
        let leftoversPool = [];    

        let initialPool = shuffleArray([...regularOperators]);
        currentSlotsState = currentSlotsState.map(() => {
            if (initialPool.length > 0) return initialPool.shift();
            return { name: "" }; 
        });
        standbyOperators = [...initialPool];
        saveSlotsToMatrix(currentSlotsState, 0, finalMatrix, slotMapping);

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

    // --- FUNÇÃO EXCEL ATUALIZADA COM LOGICA DE FONTE E LARGURA ---
    const exportToExcel = () => {
        if (displayMatrix.length === 0) return;
        const excelData = [];
        
        // Cabeçalhos
        excelData.push(["MIP", ...TIME_SLOTS]);
        
        // Dados
        MIP_IDS.forEach((mipId, index) => {
            const rowData = [mipId];
            if (displayMatrix[index]) { rowData.push(...displayMatrix[index]); }
            excelData.push(rowData);
        });
        
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(excelData);

        // 1. DEFINIÇÃO DE LARGURAS (MIP=4, OUTRAS=20)
        const wscols = [
            { wch: 4 }, // Coluna A (MIP) largura 4
            ...TIME_SLOTS.map(() => ({ wch: 20 })) // Colunas de horário largura 20
        ];
        ws['!cols'] = wscols;

        // 2. ESTILIZAÇÃO (BORDAS + FONTE CONDICIONAL)
        const range = XLSX.utils.decode_range(ws['!ref']);
        for (let R = range.s.r; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const cell_address = XLSX.utils.encode_cell({ r: R, c: C });
                if (!ws[cell_address]) continue;

                const cell = ws[cell_address];
                const cellValue = cell.v ? String(cell.v) : "";
                
                // Verifica quantos nomes existem (baseado no separador " / ")
                // Se tiver 2 barras (ex: "Nome / Nome / Nome"), tem 3 nomes.
                const numberOfOperators = cellValue.split('/').length;
                
                // Lógica da Fonte: 3 ou mais nomes = 11, senão = 12 (padrão)
                const fontSize = numberOfOperators >= 3 ? 11 : 12;

                // Aplica estilo
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
                        sz: fontSize, // Aplica o tamanho calculado
                        bold: R === 0 // Negrito se for cabeçalho
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
        .filter(op => !op.isJoker)
        .filter(op => op.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a,b) => a.name.localeCompare(b.name));

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
                    <Button variant="outlined" startIcon={<DownloadIcon />} onClick={exportToExcel} disabled={displayMatrix.length === 0}>Baixar Escala</Button>
                </Stack>

                {displayMatrix.length > 0 && (
                    <TableContainer component={Paper} variant="outlined" sx={{maxHeight: '600px'}}>
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
                                    return (
                                    <TableRow key={mip} hover>
                                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>{mip}</TableCell>
                                        <TableCell align="center" sx={{ backgroundColor: '#f5f5f5', color: 'text.secondary', fontSize: '0.8rem' }}>{configLabel}</TableCell>
                                        {displayMatrix[rowIndex] && displayMatrix[rowIndex].map((cellValue, colIndex) => {
                                            const isNA = cellValue === 'N/A';
                                            const isEmpty = cellValue === "";
                                            const operatorData = findOperatorData(cellValue);
                                            const currentTimeSlot = TIME_SLOTS[colIndex];
                                            const isLastSlot = colIndex === TIME_SLOTS.length - 1;
                                            const isOnBreakSlot = operatorData && operatorData.breakTime === currentTimeSlot && !isLastSlot;

                                            return (
                                            <TableCell key={colIndex} align="center" onClick={(event) => handleCellClick(event, rowIndex, colIndex, cellValue)}
                                                sx={{
                                                 backgroundColor: isNA ? '#e0e0e0' : (isEmpty ? '#fff' : (isOnBreakSlot ? '#fff9c4' : 'inherit')),
                                                 color: isNA ? 'text.disabled' : 'inherit',
                                                 cursor: (!isNA) ? 'pointer' : 'default',
                                                 '&:hover': { backgroundColor: (!isNA) ? '#f5f5f5' : undefined },
                                                 fontSize: cellValue.includes('/') ? '0.8rem' : 'inherit'
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
                                        primary={op.name} 
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

            </Box>
        </Paper>
    );
}

export default Escala;