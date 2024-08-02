import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Input } from "@/app/components/ui/input";
import { Switch } from "@/app/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";
import { Download, Plus, Trash2 } from "lucide-react";
import { AuthorInfo, Background, Slide, TextContent } from '../page';
import CustomColorInput from './CustomColorInput';

const colorOptions = [
    '#CC0000', // Less Vibrant Red
    '#CC6699', // Less Vibrant Hot Pink
    '#009ACD', // Less Vibrant Deep Sky Blue
    '#2E8B57', // Less Vibrant Lime Green
    '#7B68EE', // Less Vibrant Lavender
    '#20B2AA', // Less Vibrant Dark Turquoise
    '#FF7F50', // Less Vibrant Dark Orange
    '#DAA520', // Less Vibrant Gold
    '#7A42CC', // Less Vibrant Blue Violet
    '#FF6347', // Less Vibrant Orange Red
    '#4682B4', // Less Vibrant Blue-Gray
    '#BC8F8F',  // Less Vibrant Tan
    '#FCFCFC', // Almost White
    '#FAFAFA', // Snow
    '#F0FFFF', // Azure
    '#F0FFF0', // Honeydew
    '#E6E6FA', // Lavender
    '#E0FFFF', // Light Cyan
    '#FFF5EE', // Seashell
    '#F0EAD6', // Eggshell
    '#F8F8FF', // Ghost White
    '#FFFAF0', // Floral White
    '#E8F3F3', // Light Blue-Gray
    '#F5F5DC', // Beige
    '#F5F5F5', // White Smoke
    '#FDF5E6'  // Old Lace
];

const gradientOptions = [
    // Subtle options
    'linear-gradient(to right, #ffffff, #f2f7fd)', // Crisp White to Soft Blue
    'linear-gradient(to right, #f8f9fa, #e9ecef)', // Clean Gray
    'linear-gradient(to right, #f0f8ff, #e6f3ff)', // Alice Blue Shades
    'linear-gradient(to right, #f5f7fa, #e4e8ed)', // Subtle Blue-Gray

    // Vibrant options
    'linear-gradient(to right, #ffecd2, #fcb69f)', // Juicy Peach
    'linear-gradient(to right, #d4fc79, #96e6a1)', // Fresh Grass
    'linear-gradient(to right, #84fab0, #8fd3f4)', // Aqua Splash
    'linear-gradient(to right, #a1c4fd, #c2e9fb)', // Soft Blue
    'linear-gradient(to right, #fad0c4, #ffd1ff)', // Pastel Pink

    // Mix of subtle and vibrant
    'linear-gradient(to right, #fdfcfb, #e2d1c3)', // Warm White
    'linear-gradient(to right, #f5f7fa, #c3cfe2)', // Mellow Blue
    'linear-gradient(to right, #fdcbf1, #e6dee9)', // Gentle Care
    'linear-gradient(to right, #a8edea, #fed6e3)', // Young Passion
    'linear-gradient(to right, #e0c3fc, #8ec5fc)', // Lavender Water
    'linear-gradient(to right, #f3e7e9, #e3eeff)', // Winter Neva

    // Professional vibrant
    'linear-gradient(to right, #4facfe, #00f2fe)', // Blue Lagoon
    'linear-gradient(to right, #43e97b, #38f9d7)', // Emerald Water
    'linear-gradient(to right, #fa709a, #fee140)', // Sweet Period
    'linear-gradient(to right, #6a11cb, #2575fc)', // Deep Blue
];

const imageOptions = [
    '/assets/bg-9.png',
    '/assets/new-book.png',
    '/assets/book.svg',
    '/assets/bg-1.png',
    '/assets/bg-2.png',
    '/assets/bg-4.png',
    '/assets/bg-5.png',
    '/assets/bg-6.png',
    '/assets/bg-7.png',
    '/assets/bg-8.png',
    '/assets/bg-10.png',
    // '/assets/bg-12.png',
    '/assets/bg-13.png',
    '/assets/bg-14.png',
    '/assets/bg-15.png',
    '/assets/bg-16.png',
    '/assets/bg-17.png',
    '/assets/bg-18.png',

];

const socialMediaPlatforms = [
    { id: 'x', name: 'X' },
    { id: 'linkedin', name: 'LinkedIn' },
    { id: 'github', name: 'GitHub' },
    { id: 'instagram', name: 'Instagram' },
];

interface PdfGeneratorSettingsProps {
    onClickDownload: () => void;
    updateSlideSettings: (slideIndex: number, section: keyof Slide, field: string, value: string | TextContent[]) => void;
    currentSlide: Slide;
    currentSlideIndex: number;
    updateBackground: (newBackground: Background) => void;
    activeTab: string;
    onChangeTab: (tab: string) => void;
    activeBackground: string;
    authorInfo: AuthorInfo;
    updateAuthorInfo: (newInfo: Partial<AuthorInfo>) => void;
}

const PdfGeneratorSettings: React.FC<PdfGeneratorSettingsProps> = ({ onClickDownload, updateSlideSettings, currentSlide,
    currentSlideIndex, updateBackground, activeTab, onChangeTab, activeBackground, authorInfo, updateAuthorInfo }) => {
    const [backgroundType, setBackgroundType] = useState<'solid' | 'gradient' | 'image'>('gradient');
    const [showAuthorProfile, setShowAuthorProfile] = useState(true);
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
        const newEntry: TextContent = { text: '', color: contentEntries[contentEntries.length - 1].color, fontFamily: contentEntries[contentEntries.length - 1].fontFamily };
        const newEntries = [...contentEntries, newEntry];
        setContentEntries(newEntries);
        handleSettingChange('content', 'text', newEntries);
    };

    const removeContentEntry = (index: number) => {
        const newEntries = contentEntries.filter((_, i) => i !== index);
        setContentEntries(newEntries);
        handleSettingChange('content', 'text', newEntries);
    };

    const handleBackgroundChange = (type: 'solid' | 'gradient' | 'image', value: string) => {
        updateBackground({ type, value });
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

            <Tabs value={activeTab} defaultValue="background" className='space-y-5' onValueChange={onChangeTab}>
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
                                defaultValue="gradient"
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
                                            className={`w-12 h-12 rounded-sm cursor-pointer ${activeBackground === color ? `border-2 border-gray-300 ring-2 ring-blue-300` : 'border border-gray-200'
                                                }`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => handleBackgroundChange('solid', color)}
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
                                            className={`w-12 h-12 rounded-sm cursor-pointer ${activeBackground === gradient ? `border-2 border-gray-300 ring-2 ring-blue-300` : 'border border-gray-200'
                                                }`}
                                            style={{ background: gradient }}
                                            onClick={() => handleBackgroundChange('gradient', gradient)}
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
                                            onClick={() => handleBackgroundChange('image', image)}
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
                                        <CustomColorInput
                                            value={currentSlide[textType].color}
                                            onChange={(color) => handleSettingChange(textType, 'color', color)}
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
                                            <CustomColorInput
                                                value={entry.color}
                                                onChange={(color) => handleContentChange(index, 'color', color)}
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
                                    <Input
                                        id="authorName"
                                        placeholder="Enter your name" className="mt-1"
                                        value={authorInfo.name}
                                        onChange={(e) => updateAuthorInfo({ name: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="authorProfilePic">Profile Picture</Label>
                                    <Input
                                        id="authorProfilePic"
                                        type="file"
                                        accept="image/*"
                                        className="mt-1"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    updateAuthorInfo({ profilePicture: reader.result as string });
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                </div>

                                <div>
                                    <Label>Social Media Handle</Label>
                                    <RadioGroup
                                        onValueChange={(value) => updateAuthorInfo({ socialMediaPlatform: value })}
                                        value={authorInfo.socialMediaPlatform}
                                        className="mt-2"
                                    >
                                        {socialMediaPlatforms.map((platform) => (
                                            <div key={platform.id} className="flex items-center space-x-2">
                                                <RadioGroupItem value={platform.id} id={platform.id} />
                                                <Label htmlFor={platform.id}>{platform.name}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                    {authorInfo.socialMediaPlatform && (
                                        <Input
                                            placeholder={`Enter your ${socialMediaPlatforms.find(p => p.id === authorInfo.socialMediaPlatform)?.name} handle`}
                                            className="mt-2"
                                            value={authorInfo.socialMediaHandle}
                                            onChange={(e) => updateAuthorInfo({ socialMediaHandle: e.target.value })}
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