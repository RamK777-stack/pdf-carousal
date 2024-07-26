import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Input } from "@/app/components/ui/input";
import { Switch } from "@/app/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";
import { Download, Plus, Trash2 } from "lucide-react";
import { Slide, TextContent } from '../page';

const colorOptions = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#800000', '#008000', '#000080', '#808000', '#800080', '#008080',
    '#C0C0C0', '#808080', '#000000', '#FFFFFF'
];

const gradientOptions = [
    'linear-gradient(to right, #ff9966, #ff5e62)',
    'linear-gradient(to right, #00c6ff, #0072ff)',
    'linear-gradient(to right, #4facfe, #00f2fe)',
    'linear-gradient(to right, #43e97b, #38f9d7)',
    'linear-gradient(to right, #fa709a, #fee140)',
    'linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4)'
];

const imageOptions = [
    '/path/to/image1.jpg',
    '/path/to/image2.jpg',
    '/path/to/image3.jpg',
    '/path/to/image4.jpg',
    '/path/to/image5.jpg',
    '/path/to/image6.jpg'
];

const socialMediaPlatforms = [
    { id: 'twitter', name: 'Twitter' },
    { id: 'linkedin', name: 'LinkedIn' },
    { id: 'github', name: 'GitHub' },
    { id: 'instagram', name: 'Instagram' },
];


interface PdfGeneratorSettingsProps {
    onClickDownload: () => void;
    updateSlideSettings: (slideIndex: number, section: keyof Slide, field: string, value: string | TextContent[]) => void;
    currentSlide: Slide;
    currentSlideIndex: number;
}

const PdfGeneratorSettings: React.FC<PdfGeneratorSettingsProps> = ({ onClickDownload, updateSlideSettings, currentSlide, currentSlideIndex }) => {
    const [backgroundType, setBackgroundType] = useState<'solid' | 'gradient' | 'image'>('solid');
    const [showAuthorProfile, setShowAuthorProfile] = useState(true);
    const [selectedSocialMedia, setSelectedSocialMedia] = useState('');
    const [contentEntries, setContentEntries] = useState<TextContent[]>([]);

    useEffect(() => {
        setContentEntries(currentSlide.content || []);
    }, [currentSlide]);

    const handleSettingChange = (section: keyof Slide, field: string, value: string | TextContent[]) => {
        updateSlideSettings(currentSlideIndex, section, field, value);
    };

    const handleContentChange = (index: number, field: keyof TextContent, value: string) => {
        const newEntries = contentEntries.map((entry, i) => 
            i === index ? { ...entry, [field]: value } : entry
        );
        setContentEntries(newEntries);
        handleSettingChange('content', 'text', newEntries);
    };

    const addContentEntry = () => {
        const newEntry: TextContent = { text: '', color: '#000000', fontFamily: 'Arial' };
        const newEntries = [...contentEntries, newEntry];
        setContentEntries(newEntries);
        handleSettingChange('content', 'text', newEntries);
    };

    const removeContentEntry = (index: number) => {
        const newEntries = contentEntries.filter((_, i) => i !== index);
        setContentEntries(newEntries);
        handleSettingChange('content', 'text', newEntries);
    };

    return (
        <div className="flex flex-col h-full w-full p-5 bg-white rounded overflow-y-auto">
            <div className='flex justify-between items-start'>
                <div className='space-y-1 mb-5'>
                    <h3 className='text-xl font-semibold'>PDF Generator Settings </h3>
                    <h5 className='text-sm text-gray-600'>Customize your carousel PDF output</h5>
                </div>
                <Button variant="outline" size="sm" onClick={onClickDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                </Button>
            </div>

            <Tabs defaultValue="background" className='space-y-5'>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="background">Background</TabsTrigger>
                    <TabsTrigger value="text">Text</TabsTrigger>
                    <TabsTrigger value="author">Author Profile</TabsTrigger>
                </TabsList>

                <TabsContent value="background">
                    <div className="space-y-4">
                        <div>
                            <Label>Background Type</Label>
                            <RadioGroup
                                defaultValue="solid"
                                className="mt-2 flex space-x-4"
                                onValueChange={(value: 'solid' | 'gradient' | 'image') => setBackgroundType(value)}
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="solid" id="solid" />
                                    <Label htmlFor="solid">Solid</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="gradient" id="gradient" />
                                    <Label htmlFor="gradient">Gradient</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="image" id="image" />
                                    <Label htmlFor="image">Image</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {backgroundType === 'solid' && (
                            <div>
                                <Label className="mb-2 block">Choose a color</Label>
                                <div className="flex flex-wrap gap-2">
                                    {colorOptions.map((color, index) => (
                                        <div
                                            key={index}
                                            className="w-12 h-12 rounded-sm cursor-pointer border border-gray-200"
                                            style={{ backgroundColor: color }}
                                            onClick={() => {/* Handle color selection */ }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {backgroundType === 'gradient' && (
                            <div>
                                <Label className="mb-2 block">Choose a gradient</Label>
                                <div className="flex flex-wrap gap-2">
                                    {gradientOptions.map((gradient, index) => (
                                        <div
                                            key={index}
                                            className="w-12 h-12 rounded-sm cursor-pointer border border-gray-200"
                                            style={{ background: gradient }}
                                            onClick={() => {/* Handle gradient selection */ }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {backgroundType === 'image' && (
                            <div>
                                <Label className="mb-2 block">Choose a background image</Label>
                                <div className="flex flex-wrap gap-2">
                                    {imageOptions.map((image, index) => (
                                        <div
                                            key={index}
                                            className="w-16 h-16 bg-cover bg-center rounded-sm cursor-pointer border border-gray-200"
                                            style={{ backgroundImage: `url(${image})` }}
                                            onClick={() => {/* Handle image selection */ }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="text">
                    <div className="space-y-4">
                        {(['title', 'subtitle'] as const).map((textType) => (
                            <div key={textType} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor={`show${textType}`}>{textType.charAt(0).toUpperCase() + textType.slice(1)}</Label>
                                    <Switch defaultChecked={true} id={`show${textType}`} />
                                </div>
                                <Input
                                    placeholder={`Enter ${textType}`}
                                    value={currentSlide[textType].text}
                                    onChange={(e) => handleSettingChange(textType, 'text', e.target.value)}
                                />
                                <div className="flex space-x-2">
                                    <div className="flex-1">
                                        <Label>Font Color</Label>
                                        <Input
                                            type="color"
                                            className="h-8 w-full"
                                            value={currentSlide[textType].color}
                                            onChange={(e) => handleSettingChange(textType, 'color', e.target.value)}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Label>Font Type</Label>
                                        <Select
                                            value={currentSlide[textType].fontFamily}
                                            onValueChange={(value) => handleSettingChange(textType, 'fontFamily', value)}
                                        >
                                            <SelectTrigger className="h-8">
                                                <SelectValue placeholder="Select font" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Arial">Arial</SelectItem>
                                                <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                                                <SelectItem value="Verdana">Verdana</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2 mt-2">
                        <Label>Content</Label>
                        <div className="max-h-[40vh] overflow-y-auto space-y-4 pr-2">
                            {contentEntries.map((entry, index) => (
                                <Card key={index} className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <Label>Content {index + 1}</Label>
                                        <Button variant="ghost" size="sm" onClick={() => removeContentEntry(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <Input
                                        placeholder="Enter content"
                                        value={entry.text}
                                        onChange={(e) => handleContentChange(index, 'text', e.target.value)}
                                        className="mb-2"
                                    />
                                    <div className="flex space-x-2">
                                        <div className="flex-1">
                                            <Label>Font Color</Label>
                                            <Input
                                                type="color"
                                                className="h-8 w-full"
                                                value={entry.color}
                                                onChange={(e) => handleContentChange(index, 'color', e.target.value)}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <Label>Font Type</Label>
                                            <Select
                                                value={entry.fontFamily}
                                                onValueChange={(value) => handleContentChange(index, 'fontFamily', value)}
                                            >
                                                <SelectTrigger className="h-8">
                                                    <SelectValue placeholder="Select font" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Arial">Arial</SelectItem>
                                                    <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                                                    <SelectItem value="Verdana">Verdana</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                        <Button variant="outline" size="sm" onClick={addContentEntry} className="w-full mt-2">
                            <Plus className="h-4 w-4 mr-1" /> Add Content
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="author">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="showAuthorProfile">Show Author Profile</Label>
                            <Switch
                                id="showAuthorProfile"
                                checked={showAuthorProfile}
                                onCheckedChange={setShowAuthorProfile}
                            />
                        </div>

                        {showAuthorProfile && (
                            <>
                                <div>
                                    <Label htmlFor="authorName">Author Name</Label>
                                    <Input id="authorName" placeholder="Enter your name" className="mt-1" />
                                </div>

                                <div>
                                    <Label htmlFor="authorProfilePic">Profile Picture</Label>
                                    <Input id="authorProfilePic" type="file" accept="image/*" className="mt-1" />
                                </div>

                                <div>
                                    <Label>Social Media Handle</Label>
                                    <RadioGroup
                                        onValueChange={setSelectedSocialMedia}
                                        value={selectedSocialMedia}
                                        className="mt-2"
                                    >
                                        {socialMediaPlatforms.map((platform) => (
                                            <div key={platform.id} className="flex items-center space-x-2">
                                                <RadioGroupItem value={platform.id} id={platform.id} />
                                                <Label htmlFor={platform.id}>{platform.name}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                    {selectedSocialMedia && (
                                        <Input
                                            placeholder={`Enter your ${socialMediaPlatforms.find(p => p.id === selectedSocialMedia)?.name} handle`}
                                            className="mt-2"
                                        />
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default PdfGeneratorSettings;