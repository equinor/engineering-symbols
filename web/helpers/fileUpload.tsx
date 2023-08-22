import { useState, useEffect, ChangeEvent } from 'react';

import { convertInputSvgObjectToAPIStructureObject } from './convertInputSvgObjectToAPIStructureObject';

import { UploadSymbolProps } from '../types';

import { validateSvgFileAction, SymbolUploadStore } from '../store';

interface FileUploadHookResult {
	handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
	isSvgFileLoading: boolean;
	autoUploadStatus: string;
	selectedFile: File | null;
	uploadStatus: string;
	svgContent: any;
	error: string;
}

const API_URL = 'https://dev-engsym-api.azurewebsites.net/symbols';

export const useFileUpload = (): FileUploadHookResult => {
	const [error, setError] = useState<string>('');
	const [svgContent, setSvgContent] = useState<any>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [uploadStatus, setUploadStatus] = useState<string>('No file selected.');
	const [autoUploadStatus, setAutoUploadStatus] = useState<string>('');
	const [isSvgFileLoading, setIsSvgFileLoading] = useState<boolean>(false);

	const [formData, setFormData] = useState<FormData | null>(null);
	const { validateSvgQuery } = SymbolUploadStore.useState();
	const { status, data } = validateSvgQuery;

	validateSvgFileAction.useBeckon({ query: formData });

	const uploadFile = (file: File) => {
		setAutoUploadStatus('Uploading...');
		setError('');
		setIsSvgFileLoading(true);

		const formData = new FormData();
		formData.append('svgFile', file);

		setFormData(formData);
	};

	useEffect(() => {
		console.log(status);

		if (status === 200 || status === 201) {
			setAutoUploadStatus('Upload successful.');
			handleChange();
			setIsSvgFileLoading(false);
		}

		if (status === 400) {
			console.log(111, data);
			setSelectedFile(null);
			setAutoUploadStatus('Upload failed.');
			setIsSvgFileLoading(false);
			setFormData(null);

			setError(`${data.title}: ${data.detail}`);
		}
	}, [status]);

	const convertSvgToObject = (svgElement: Element): object => {
		const svgData: any = {};
		svgData.tagName = svgElement.tagName.toLowerCase();

		// Store attributes
		const attributes = svgElement.attributes;
		for (let i = 0; i < attributes.length; i++) {
			const { name, value } = attributes[i];
			svgData[name] = value;
		}

		// Store child elements
		const children = svgElement.children;
		if (children.length > 0) {
			svgData.children = [];
			for (let i = 0; i < children.length; i++) {
				const childElement = children[i];
				const childData = convertSvgToObject(childElement);

				svgData.children.push(childData);
			}
		}

		return svgData;
	};

	const handleChange = () => {
		const reader = new FileReader();
		reader.onload = ({ target }) => {
			const contents = target?.result as string;
			const parser = new DOMParser();
			const svgDocument = parser.parseFromString(contents, 'image/svg+xml');

			if (selectedFile === null) return;

			const keyName = selectedFile.name.replace('.svg', '');
			const convertedSvgToObject = convertSvgToObject(svgDocument.documentElement);
			const svgContent = convertInputSvgObjectToAPIStructureObject(convertedSvgToObject, keyName) as unknown as UploadSymbolProps;

			setSvgContent(svgContent);
		};

		if (selectedFile === null) return;

		reader.readAsText(selectedFile);
	};

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file && file.type === 'image/svg+xml') {
			setSelectedFile(file);
			uploadFile(file);
			setUploadStatus('File selected. Ready to upload.');
			setError('');
		} else {
			setFormData(null);
			setSelectedFile(null);
			setUploadStatus('No file selected.');
			setError('Invalid file format. Please select an SVG file.');
		}

		event.target.value = '';
	};

	return { selectedFile, uploadStatus, autoUploadStatus, error, handleFileChange, svgContent, isSvgFileLoading };
};
