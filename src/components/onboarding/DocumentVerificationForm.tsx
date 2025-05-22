
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  FileText, 
  CheckCircle, 
  Upload 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form';

export interface DocumentDataType {
  gstCertificate: null | string;
  panCard: null | string;
  businessRegistration: null | string;
  cancelledCheque: null | string;
  addressProof: null | string;
  signatureProof: null | string;
}

export interface DocumentVerificationFormProps {
  data: DocumentDataType;
  onUpdate: (data: DocumentDataType) => void;
}

export default function DocumentVerificationForm({ data, onUpdate }: DocumentVerificationFormProps) {
  const [uploads, setUploads] = useState({
    gstCertificate: !!data.gstCertificate,
    panCard: !!data.panCard,
    businessRegistration: !!data.businessRegistration,
    cancelledCheque: !!data.cancelledCheque,
    addressProof: !!data.addressProof,
    signatureProof: !!data.signatureProof
  });
  
  const form = useForm({
    defaultValues: {
      gstCertificate: data.gstCertificate || null,
      panCard: data.panCard || null,
      businessRegistration: data.businessRegistration || null,
      cancelledCheque: data.cancelledCheque || null,
      addressProof: data.addressProof || null,
      signatureProof: data.signatureProof || null
    }
  });
  
  const onSubmit = (values) => {
    onUpdate(values);
  };
  
  const handleFileChange = (fieldName) => (e) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue(fieldName, file);
      setUploads(prev => ({ ...prev, [fieldName]: true }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6">
        <h3 className="text-sm font-medium text-blue-800 mb-1">Document Verification</h3>
        <p className="text-xs text-blue-700">
          Please upload clear, valid documents for verification. All documents should be in PDF, JPG, or PNG format, with a maximum file size of 5MB.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* GST Certificate */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">GST Certificate</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Upload your GST registration certificate issued by the government
                  </p>
                  
                  <div className="mt-2">
                    {uploads.gstCertificate ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-green-600 h-4 w-4" />
                        <span className="text-sm">Document uploaded</span>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            form.setValue("gstCertificate", null);
                            setUploads(prev => ({ ...prev, gstCertificate: false }));
                          }}
                        >
                          Replace
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name="gstCertificate"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="file"
                                  onChange={handleFileChange("gstCertificate")}
                                  className="hidden"
                                  id="gst-certificate"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          asChild
                        >
                          <label htmlFor="gst-certificate" className="cursor-pointer">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload File
                          </label>
                        </Button>
                        <Badge variant="outline">Required</Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* PAN Card */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">PAN Card</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Upload PAN card of your business entity
                  </p>
                  
                  <div className="mt-2">
                    {uploads.panCard ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-green-600 h-4 w-4" />
                        <span className="text-sm">Document uploaded</span>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            form.setValue("panCard", null);
                            setUploads(prev => ({ ...prev, panCard: false }));
                          }}
                        >
                          Replace
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name="panCard"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="file"
                                  onChange={handleFileChange("panCard")}
                                  className="hidden"
                                  id="pan-card"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          asChild
                        >
                          <label htmlFor="pan-card" className="cursor-pointer">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload File
                          </label>
                        </Button>
                        <Badge variant="outline">Required</Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Business Registration */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">Business Registration</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Upload certificate of incorporation or business registration document
                  </p>
                  
                  <div className="mt-2">
                    {uploads.businessRegistration ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-green-600 h-4 w-4" />
                        <span className="text-sm">Document uploaded</span>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            form.setValue("businessRegistration", null);
                            setUploads(prev => ({ ...prev, businessRegistration: false }));
                          }}
                        >
                          Replace
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name="businessRegistration"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="file"
                                  onChange={handleFileChange("businessRegistration")}
                                  className="hidden"
                                  id="business-registration"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          asChild
                        >
                          <label htmlFor="business-registration" className="cursor-pointer">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload File
                          </label>
                        </Button>
                        <Badge variant="outline">Required</Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cancelled Cheque */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">Cancelled Cheque</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Upload a scanned copy of cancelled cheque for bank verification
                  </p>
                  
                  <div className="mt-2">
                    {uploads.cancelledCheque ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-green-600 h-4 w-4" />
                        <span className="text-sm">Document uploaded</span>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            form.setValue("cancelledCheque", null);
                            setUploads(prev => ({ ...prev, cancelledCheque: false }));
                          }}
                        >
                          Replace
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name="cancelledCheque"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="file"
                                  onChange={handleFileChange("cancelledCheque")}
                                  className="hidden"
                                  id="cancelled-cheque"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          asChild
                        >
                          <label htmlFor="cancelled-cheque" className="cursor-pointer">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload File
                          </label>
                        </Button>
                        <Badge variant="outline">Required</Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Address Proof */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">Address Proof</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Upload business address proof (utility bill, rent agreement, etc.)
                  </p>
                  
                  <div className="mt-2">
                    {uploads.addressProof ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-green-600 h-4 w-4" />
                        <span className="text-sm">Document uploaded</span>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            form.setValue("addressProof", null);
                            setUploads(prev => ({ ...prev, addressProof: false }));
                          }}
                        >
                          Replace
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name="addressProof"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="file"
                                  onChange={handleFileChange("addressProof")}
                                  className="hidden"
                                  id="address-proof"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          asChild
                        >
                          <label htmlFor="address-proof" className="cursor-pointer">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload File
                          </label>
                        </Button>
                        <Badge variant="outline">Required</Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Signature Proof */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">Signature Proof</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Upload authorized signatory's signature specimen
                  </p>
                  
                  <div className="mt-2">
                    {uploads.signatureProof ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-green-600 h-4 w-4" />
                        <span className="text-sm">Document uploaded</span>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            form.setValue("signatureProof", null);
                            setUploads(prev => ({ ...prev, signatureProof: false }));
                          }}
                        >
                          Replace
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name="signatureProof"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="file"
                                  onChange={handleFileChange("signatureProof")}
                                  className="hidden"
                                  id="signature-proof"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          asChild
                        >
                          <label htmlFor="signature-proof" className="cursor-pointer">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload File
                          </label>
                        </Button>
                        <Badge variant="outline">Required</Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit">Save Documents</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
