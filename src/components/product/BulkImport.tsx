import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { parseCSV, mapColumns, validateCSVData, getSuggestedMappings } from '@/lib/csv-utils';
import { schema } from '@/lib/schema';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UploadCloud, FileSpreadsheet, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type MappedColumn = {
  csvHeader: string;
  schemaField: string;
};

type ValidationError = {
  row: number;
  column?: string;
  message: string;
};

// Update the component to accept onClose prop
interface BulkImportProps {
  onClose?: () => void;
}

export default function BulkImport({ onClose }: BulkImportProps) {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mappedColumns, setMappedColumns] = useState<MappedColumn[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [step, setStep] = useState<'upload' | 'mapping' | 'validation' | 'submit'>('upload');
  const [expandedErrors, setExpandedErrors] = useState<Record<number, boolean>>({});
  
  // Get schema fields
  const schemaFields = Object.keys(schema.properties.fixed_fields.properties);
  
  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Maximum file size is 10MB",
          variant: "destructive"
        });
        return;
      }
      
      const fileExt = selectedFile.name.split('.').pop()?.toLowerCase();
      if (!['csv', 'xls', 'xlsx'].includes(fileExt || '')) {
        toast({
          title: "Invalid file format",
          description: "Please upload a CSV or Excel file",
          variant: "destructive"
        });
        return;
      }
      
      setFile(selectedFile);
      setIsProcessing(true);
      setProgress(10);
      
      try {
        // Parse CSV file
        const parsedData = await parseCSV(selectedFile);
        setHeaders(parsedData.headers);
        setData(parsedData.rows);
        setProgress(40);
        
        // Get AI-suggested mappings
        const suggestedMappings = await getSuggestedMappings(parsedData.headers, schemaFields);
        setMappedColumns(suggestedMappings);
        setProgress(70);
        
        // Move to mapping step
        setStep('mapping');
        setProgress(100);
        
        toast({
          title: "File processed successfully",
          description: `Found ${parsedData.rows.length} products to import`
        });
      } catch (error) {
        toast({
          title: "Error processing file",
          description: "Please check the file format and try again",
          variant: "destructive"
        });
      } finally {
        setIsProcessing(false);
      }
    }
  };
  
  // Handle column mapping change
  const handleMappingChange = (csvHeader: string, schemaField: string) => {
    setMappedColumns(prev => 
      prev.map(col => 
        col.csvHeader === csvHeader ? { ...col, schemaField } : col
      )
    );
  };
  
  // Validate the mapped data
  const handleValidate = () => {
    setIsProcessing(true);
    setProgress(30);
    
    // Get schema requirements for validation
    const schemaRequirements: Record<string, any> = {};
    Object.entries(schema.properties.fixed_fields.properties).forEach(([field, def]) => {
      schemaRequirements[field] = {
        required: schema.properties.fixed_fields.required?.includes(field) || false,
        type: (def as any).type
      };
    });
    
    const result = validateCSVData(data, mappedColumns, schemaRequirements);
    setValidationErrors(result.errors);
    setProgress(100);
    
    if (result.errors.length > 0) {
      toast({
        title: "Validation failed",
        description: `Found ${result.errors.length} errors`,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Validation successful",
        description: `${data.length} products ready to import`
      });
      setStep('validation');
    }
    
    setIsProcessing(false);
  };
  
  // Submit the import
  const handleSubmit = () => {
    setIsProcessing(true);
    setProgress(50);
    
    // In a real app, this would call an API to submit the data
    setTimeout(() => {
      setProgress(100);
      setIsProcessing(false);
      
      toast({
        title: "Import successful",
        description: `${data.length} products have been imported`
      });
      
      // Call onClose if provided
      if (onClose) {
        onClose();
      }
      
      // Reset form
      setFile(null);
      setHeaders([]);
      setMappedColumns([]);
      setData([]);
      setValidationErrors([]);
      setStep('upload');
    }, 2000);
  };
  
  // Toggle error details
  const toggleErrorDetails = (rowNumber: number) => {
    setExpandedErrors(prev => ({
      ...prev,
      [rowNumber]: !prev[rowNumber]
    }));
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bulk Import Products</CardTitle>
        <CardDescription>
          Import multiple products at once using a CSV or Excel file
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {/* Progress indicator */}
        {isProcessing && (
          <div className="mb-6">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              {step === 'upload' && 'Processing file...'}
              {step === 'mapping' && 'Validating data...'}
              {step === 'validation' && 'Submitting import...'}
            </p>
          </div>
        )}
        
        {/* Step 1: File Upload */}
        {step === 'upload' && (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-md bg-muted/30">
            <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="font-medium mb-1">Upload your file</p>
            <p className="text-sm text-muted-foreground mb-4">
              CSV, XLS or XLSX files up to 10MB
            </p>
            
            <Input
              id="file-upload"
              type="file"
              accept=".csv,.xls,.xlsx"
              onChange={handleFileChange}
              className="max-w-sm"
              disabled={isProcessing}
            />
            
            <div className="mt-8">
              <p className="text-sm font-medium mb-2">Your file should contain:</p>
              <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                <li>Required fields: Product Name, Category, Product Images</li>
                <li>Up to 10,000 products per file</li>
                <li>Images as URLs (1000×1000px minimum)</li>
                <li>One product per row</li>
              </ul>
            </div>
            
            <Button variant="outline" className="mt-6">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          </div>
        )}
        
        {/* Step 2: Column Mapping */}
        {step === 'mapping' && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
              <p className="font-medium">{file?.name}</p>
              <Badge variant="outline" className="ml-2">
                {data.length} products
              </Badge>
            </div>
            
            <Tabs defaultValue="mapping">
              <TabsList className="mb-4">
                <TabsTrigger value="mapping">Column Mapping</TabsTrigger>
                <TabsTrigger value="preview">Data Preview</TabsTrigger>
              </TabsList>
              
              <TabsContent value="mapping">
                <div className="border rounded-md">
                  <div className="bg-muted p-3 grid grid-cols-2 gap-4 font-medium text-sm">
                    <div>CSV Column</div>
                    <div>Field Mapping</div>
                  </div>
                  
                  <Separator />
                  
                  <div className="p-1">
                    {mappedColumns.map(({ csvHeader, schemaField }) => (
                      <div key={csvHeader} className="grid grid-cols-2 gap-4 p-2 items-center">
                        <div className="text-sm">{csvHeader}</div>
                        <Select
                          value={schemaField}
                          onValueChange={(value) => handleMappingChange(csvHeader, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Map to field..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">-- Do Not Map --</SelectItem>
                            {schemaFields.map(field => (
                              <SelectItem key={field} value={field}>
                                {field}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="preview">
                <div className="border rounded-md overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-muted">
                      <tr>
                        {headers.slice(0, 5).map(header => (
                          <th 
                            key={header} 
                            className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.slice(0, 5).map((row, i) => (
                        <tr key={i}>
                          {headers.slice(0, 5).map(header => (
                            <td key={header} className="px-3 py-3 whitespace-nowrap text-sm">
                              {row[header]}
                            </td>
                          ))}
                        </tr>
                      ))}
                      {data.length > 5 && (
                        <tr>
                          <td colSpan={5} className="px-3 py-3 text-sm text-center text-muted-foreground">
                            ... and {data.length - 5} more rows
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={() => {
                  setFile(null);
                  setStep('upload');
                }}
              >
                Back
              </Button>
              
              <Button onClick={handleValidate} disabled={isProcessing}>
                Validate Data
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 3: Validation Results */}
        {step === 'validation' && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
              <p className="font-medium">{file?.name}</p>
              <Badge variant="outline" className="ml-2">
                {data.length} products
              </Badge>
            </div>
            
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Validation complete</AlertTitle>
              <AlertDescription>
                {validationErrors.length === 0
                  ? `All ${data.length} products are valid and ready to import.`
                  : `Found ${validationErrors.length} errors that need to be fixed.`}
              </AlertDescription>
            </Alert>
            
            {validationErrors.length > 0 && (
              <div className="border rounded-md mb-6">
                <div className="bg-muted p-3 font-medium text-sm">
                  Validation Errors
                </div>
                
                <Separator />
                
                <div className="max-h-60 overflow-y-auto">
                  {/* Converting Record to array of entries before mapping */}
                  {Object.entries(validationErrors.reduce((acc: Record<number, ValidationError[]>, error) => {
                    if (!acc[error.row]) {
                      acc[error.row] = [];
                    }
                    acc[error.row].push(error);
                    return acc;
                  }, {})).map(([rowNumber, rowErrors]) => (
                    <div key={rowNumber} className="border-b">
                      <div 
                        className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50"
                        onClick={() => toggleErrorDetails(parseInt(rowNumber))}
                      >
                        <div className="font-medium text-sm">
                          Row {rowNumber}: {rowErrors.length} {rowErrors.length === 1 ? 'error' : 'errors'}
                        </div>
                        <div>
                          {expandedErrors[parseInt(rowNumber)] 
                            ? <ChevronUp className="h-4 w-4" /> 
                            : <ChevronDown className="h-4 w-4" />}
                        </div>
                      </div>
                      
                      {expandedErrors[parseInt(rowNumber)] && (
                        <div className="px-3 py-2 bg-muted/20 text-sm">
                          <ul className="list-disc pl-5 space-y-1">
                            {rowErrors.map((error, i) => (
                              <li key={i}>
                                {error.column && <span className="font-medium">{error.column}: </span>}
                                {error.message}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep('mapping')}>
                Back to Mapping
              </Button>
              
              <Button 
                onClick={handleSubmit} 
                disabled={isProcessing || validationErrors.length > 0}
              >
                Import Products
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between flex-col sm:flex-row text-sm text-muted-foreground border-t p-4 mt-4">
        <div className="flex items-center mb-2 sm:mb-0">
          <AlertCircle className="h-4 w-4 mr-2" />
          Need help? View our <a href="#" className="underline ml-1">bulk import guide</a>
        </div>
        
        <div>
          Max file size: 10MB | Supported formats: CSV, XLS, XLSX
        </div>
      </CardFooter>
    </Card>
  );
}
