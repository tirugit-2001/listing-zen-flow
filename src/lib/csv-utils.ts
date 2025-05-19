
/**
 * Utility functions for CSV handling and mapping
 */

type MappedColumn = {
  csvHeader: string;
  schemaField: string;
};

type ValidationError = {
  row: number;
  column?: string;
  message: string;
};

type ValidationResult = {
  isValid: boolean;
  errors: ValidationError[];
  data: any[];
};

/**
 * Parse a CSV file and return structured data
 */
export const parseCSV = async (file: File): Promise<{ headers: string[], rows: any[] }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (!event.target?.result) {
        reject(new Error("Failed to read file"));
        return;
      }

      const content = event.target.result as string;
      const lines = content.split('\n');
      
      // Extract headers (first row)
      const headers = lines[0].split(',').map(header => 
        header.trim().replace(/^"|"$/g, '') // Remove quotes
      );
      
      // Parse data rows
      const rows = lines.slice(1)
        .filter(line => line.trim() !== '')
        .map(line => {
          const row: Record<string, string> = {};
          let inQuotes = false;
          let currentField = '';
          let currentIndex = 0;
          
          // Handle quoted fields that might contain commas
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              // End of field, store it and move to next
              const header = headers[currentIndex] || `Column ${currentIndex + 1}`;
              row[header] = currentField.trim().replace(/^"|"$/g, '');
              currentField = '';
              currentIndex++;
            } else {
              currentField += char;
            }
          }
          
          // Don't forget the last field
          if (currentField) {
            const header = headers[currentIndex] || `Column ${currentIndex + 1}`;
            row[header] = currentField.trim().replace(/^"|"$/g, '');
          }
          
          return row;
        });
      
      resolve({ headers, rows });
    };

    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };

    reader.readAsText(file);
  });
};

/**
 * Map CSV columns to schema fields using AI or manual mapping
 */
export const mapColumns = (
  headers: string[],
  schemaFields: string[]
): MappedColumn[] => {
  // For now, do basic matching - in a real app, this would be AI-driven
  const mappedColumns: MappedColumn[] = [];
  
  for (const header of headers) {
    // Clean up the header for comparison
    const cleanHeader = header.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Try to find a matching schema field
    const matchedField = schemaFields.find(field => {
      const cleanField = field.toLowerCase();
      return cleanHeader.includes(cleanField) || cleanField.includes(cleanHeader);
    });
    
    mappedColumns.push({
      csvHeader: header,
      schemaField: matchedField || ''
    });
  }
  
  return mappedColumns;
};

/**
 * Validate CSV data against schema requirements
 */
export const validateCSVData = (
  data: any[],
  mappedColumns: MappedColumn[],
  schemaRequirements: Record<string, any>
): ValidationResult => {
  const errors: ValidationError[] = [];
  const validatedData: any[] = [];
  
  data.forEach((row, rowIndex) => {
    const rowNumber = rowIndex + 2; // +2 because rows are 0-indexed and we skip header row
    const validatedRow: Record<string, any> = {};
    let rowHasErrors = false;
    
    // Validate each mapped column
    mappedColumns.forEach(({ csvHeader, schemaField }) => {
      if (!schemaField) return; // Skip unmapped columns
      
      const value = row[csvHeader];
      const fieldRequirements = schemaRequirements[schemaField];
      
      if (!fieldRequirements) return; // No requirements, no validation
      
      // Check if required field is missing
      if (fieldRequirements.required && (value === undefined || value === '')) {
        errors.push({
          row: rowNumber,
          column: csvHeader,
          message: `Required field "${schemaField}" is missing`
        });
        rowHasErrors = true;
        return;
      }
      
      // Store the validated value
      validatedRow[schemaField] = value;
    });
    
    if (!rowHasErrors) {
      validatedData.push(validatedRow);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
    data: validatedData
  };
};

/**
 * Mock API for generating AI suggestions for mapping
 */
export const getSuggestedMappings = async (
  headers: string[],
  schemaFields: string[]
): Promise<MappedColumn[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would call an AI API
  return mapColumns(headers, schemaFields);
};
